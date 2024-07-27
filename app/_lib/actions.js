"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";
import {
  checkIfRegisteredEmail,
  createGuest,
  deleteGuest,
  getBookings,
  getGuest,
} from "./data-service";
import { createClient } from "./supabase/supabaseServer";
import { headers } from "next/headers";

// SIGNING IN AS A NEW USER USING AUTH.js & GOOGLE OAUTH
export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

// SIGNING IN AS A NEW USER SUPABASE
export async function signupSupabase(formData) {
  const supabase = createClient();
  const email = formData.get("email");
  const password = formData.get("password");

  let guestId;

  const existingGuest = await getGuest(email);

  if (!existingGuest) {
    // Creating a new guest in the supabase database
    const { data: guestData, error: guestDataError } = await createGuest({
      email: formData.get("email"),
      fullName: formData.get("fullName"),
    });

    if (guestDataError) {
      console.error(guestDataError);
      throw new Error("There was an error creating your account");
    }

    guestId = guestData.at(0).id;
  } else {
    guestId = existingGuest.id;
  }

  const data = {
    email,
    password,
    options: {
      data: {
        fullName: formData.get("fullName"),
        avatar: "",
        role: "guest",
        guestId,
      },
    },
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    // Deleting guest from guest database table if there was an error creating a new user
    await deleteGuest(formData.get("email"));

    console.error(error);
    throw new Error("There was an error creating your account");
  }

  // revalidatePath("/", "layout");
  redirect("/signup/verify");
}

// LOGING IN AS SUPABASE USER
export async function loginSupabase(formData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error(error);
    throw new Error("There was an error logging into your account");
  }

  // revalidatePath("/", "layout");
  redirect("/account");
}

// LOGING OUT
export async function logoutAction() {
  const session = await auth();

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If Logged in through GOOGLE OAUTH
  if (session) {
    await signOut({ redirectTo: "/" });
  }
  // If Logged in though SUPABASE
  else if (user) {
    let { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error);
      throw new Error("There was an error loging out");
    }
    redirect("/");
  }
  return;
}

// RESET PASSWORD: SEND EMAIL
export async function resetPasswordWithMail(formData) {
  const supabase = createClient();

  const email = formData.get("email");

  const registeredEmail = await checkIfRegisteredEmail(email);

  if (!registeredEmail) {
    throw new Error("You are not a  registered user");
  }

  const origin = headers.get("origin");
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/recovery/reset-password`,
  });

  if (error) {
    throw new Error(
      "There was error sending you a mail with password reset link"
    );
  }

  redirect("/recovery/forgot-password/confirm");
}

// RESET PASSWORD
export async function resetPassword(formData) {
  const supabase = createClient();

  const sessionCode = formData.get("sessionCode");

  if (sessionCode) {
    const { error } = await supabase.auth.exchangeCodeForSession(sessionCode);

    if (error) {
      console.error(error);
      throw new Error("Unable to reset password. Session link has expired");
    }
  }

  const password = formData.get("password");
  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    console.error(error);
    throw new Error("There was an error resetting your password");
  }

  redirect("/login");
}

// CREATING A NEW BOOKING/RESERVATION
export async function createBooking(bookingData, formData) {
  const session = await auth();

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!session && !user) throw new Error("You need to Log in");

  const guestId = session ? session.user.guestId : user.user_metadata.guestId;

  const booking = {
    ...bookingData,
    guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  const { data, error } = await supabase
    .from("bookings")
    .insert([booking])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  // REDIRECTING TO ALL RESERVATIONS PAGE
  redirect(`/checkout/${data.id}`);
}

// UPDATING GUEST PROFILE DATA IN DB
export async function updateGuestProfile(formData) {
  const session = await auth();

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!session && !user) throw new Error("You need to Log in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  const guestId = session ? session.user.guestId : user.user_metadata.guestId;

  // Checking for a valid National Id
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error("Please enter a valid national ID");
  }

  const updateData = { nationality, countryFlag, nationalID };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", guestId)
    .select()
    .single();

  if (error) {
    throw new Error("Guest could not be updated");
  }

  // Clearing cache to save new profile data in cache
  revalidatePath("/account/profile");

  return data;
}

// UPDATING A EXISTING BOOKING
export default async function updateBooking(formData) {
  // AUTHENTICATION
  const session = await auth();

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!session && !user) throw new Error("You need to Log in");

  const bookingId = Number(formData.get("bookingId"));
  const guestId = session ? session.user.guestId : user.user_metadata.guestId;

  // AUTHORIZATION
  // Checking if the reservation that is getting UPDATED is actually reserved by the current authenticated user
  // If NOT, throw an error
  const guestBookings = await getBookings(guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingsIds.includes(bookingId)) {
    throw new Error("You are NOT allowed to update this booking");
  }

  // EXTRACTING FORM DATA
  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations").slice(0, 1000);
  const updateData = { numGuests, observations };

  // UPDATING DATABASE
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    throw new Error("Booking could not be updated");
  }

  // REVALIDATION
  revalidatePath(`/account/reservation/edit${bookingId}`);

  // REDIRECTING TO ALL RESERVATIONS PAGE
  redirect("/account/reservations");
}

// DELETING A RESERVATION
export async function deleteReservation(bookingId) {
  const session = await auth();

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!session && !user) throw new Error("You need to Log in");

  const guestId = session ? session.user.guestId : user.user_metadata.guestId;

  // Checking if the reservation that is getting DELETED is actually reserved by the current authenticated user
  // If NOT, throw an error
  const guestBookings = await getBookings(guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingsIds.includes(bookingId)) {
    throw new Error("You are NOT allowed to book this data");
  }

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations");
}
