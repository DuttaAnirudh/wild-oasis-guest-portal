# The Wild Oasis

The Wild Oasis is a small boutique hotel with 8 luxury wooden cabins.
This customer-facing website is specifically designed for guests to use, allowing them to learn about the hotel, browse all cabins, reserve a cabin, and create and update their profiles. [Live](https://wild-oasis-guests.vercel.app/)

![Wild Oasis Guests UI](./public/UI.png)

## Tech Stack

- **Framework**: Next.js
- **UI State Management**: Context API
- **Authentication & Authorization**: Auth.js & Supabase
- **Authentication Provider**: Google Cloud OAuth 2.0
- **DB/API**: Supabase
- **Styling**: TailwindCSS
- **Payment Gateway**: Stripe
- **Invoice**: Resend & React Email
- **Additional Libraries**: date-fns, react-day-picker, heroicons

## Potential Users

- Potential guests and actual guests

## About

- Guests can get information about each cabin and see booked dates
- Guests can filter cabins by their maximum guest capacity

## Reservations

- Guests can reserve a cabin for a certain date range
- Guests can view all their past and future reservations
- Guests can update or cancel their reservations

## Authentication

- Guests need to sign up and log in using their Google email IDs before they can reserve a cabin and perform any operations
- On sign up, each guest gets a profile in the Supabase DB

## Profile

- Guests can set and update basic data about their profile to make check-in at the hotel faster

## Pages

- **Homepage**: /
- **About Page**: /about
- **Cabin Overview**: /cabins
- **Cabin Detail**: /cabins/:cabinId
- **Signup**: /signup
- **Login**: /login
- **Reservation List**: /account/reservations
- **Edit Reservation**: /account/reservation/edit/:bookingId
- **Update Profile**: /account/profile
- **Checkout Page**: /checkout/:bookingId
- **Recover Forgotten Password**: /recovery/forgot-password
- **Recover Reset Password**: /recovery/reset-password?:sessionCode

## Improvements

- ~~Currently, the website accepts no online payments. This can be improved by adding a payment gateway like Stripe or Razorpay for online payments.~~ [✅ Feature Added]
- Add responsiveness to the web app. Currently, the app is only optimized for large screens (i.e., desktop).
- ~~Accept direct sign-ups and sign-ins using Supabase authentication rather than just Google sign-up.~~ [✅ Feature Added]
- ~~Allow Supabase signed up users to change password.~~ [✅ Feature Added]
- ~~Send a confirmation email and payment invoice to the user on successful booking of a cabin.~~ [✅ Feature Added]
