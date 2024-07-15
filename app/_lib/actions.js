"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "./supabase";
import { auth, signIn, signOut } from "./auth";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

// CREATING A NEW BOOKING/RESERVATION
export async function createBooking(bookingData, formData) {
  const session = await auth();

  if (!session) throw new Error("You need to Log in");

  const booking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  const { error } = await supabase
    .from("bookings")
    .insert([booking])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  // REVALIDATION OF DATA IN CABIN PAGE
  revalidatePath(`/cabin/${bookingData.cabinId}`);

  // REDIRECTING TO ALL RESERVATIONS PAGE
  redirect("/account/reservations");
}

// UPDATING GUEST PROFILE DATA IN DB
export async function updateGuestProfile(formData) {
  const session = await auth();

  if (!session) throw new Error("You need to Log in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  // Checking for a valid National Id
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error("Please enter a valid national ID");
  }

  const updateData = { nationality, countryFlag, nationalID };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId)
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
  if (!session) throw new Error("You need to Log in");

  const bookingId = Number(formData.get("bookingId"));

  // AUTHORIZATION
  // Checking if the reservation that is getting UPDATED is actually reserved by the current authenticated user
  // If NOT, throw an error
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingsIds.includes(bookingId)) {
    throw new Error("You are NOT allowed to update this booking");
  }

  // EXTRACTING FORM DATA
  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations").slice(0, 1000);
  const updateData = { numGuests, observations };

  // UPDATING DATABASE
  const { data, error } = await supabase
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

  return data;
}

// DELETING A RESERVATION
export async function deleteReservation(bookingId) {
  const session = await auth();

  if (!session) throw new Error("You need to Log in");

  // Checking if the reservation that is getting DELETED is actually reserved by the current authenticated user
  // If NOT, throw an error
  const guestBookings = await getBookings(session.user.guestId);
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
