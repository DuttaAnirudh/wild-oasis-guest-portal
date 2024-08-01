// import { NextResponse } from "next/server";

// export function middleware(request) {
//   //   console.log(request);

//   return NextResponse.redirect(new URL("/about", request.url));
// }

import { auth } from "@/app/_lib/auth";
import { updateSession } from "./app/_lib/supabase/supabaseServer";

export async function middleware(request) {
  // Run Supabase session update middleware
  const supabaseResponse = await updateSession(request);

  // If Supabase session response is ok === true, return response
  if (supabaseResponse.ok) {
    return supabaseResponse;
  }

  // Run auth.js middleware
  return auth(request);
}

export const config = {
  matcher: ["/account"],
};

// export const middleware = auth;
