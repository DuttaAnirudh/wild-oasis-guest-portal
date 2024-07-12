"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "./supabase";
import { auth, signIn, signOut } from "./auth";
import { getBookings } from "./data-service";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
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

// DELETING A RESERVATION
export async function deleteReservation(bookingId) {
  const session = await auth();

  if (!session) throw new Error("You need to Log in");

  // Checking if the reservation that is getting deleted is actually reserved by the current authenticated user
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
