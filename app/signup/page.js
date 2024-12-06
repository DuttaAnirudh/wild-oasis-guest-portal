import Logo from "@/app/_components/Logo";
import Link from "next/link";
import SignInButton from "../_components/SignInButton";
import NoCustomSignupsAlert from "../_components/NoCustomSignupsAlert";

// import { signupSupabase } from "../_lib/actions";

export const metadata = {
  title: "Signup",
};

export default function SignUp() {
  return (
    <div className="flex flex-col items-center justify-center h-full max-w-[30rem] sm:w-[30rem] mx-auto px-2 sm:px-4 xl:px-0">
      <div className="flex flex-col items-center justify-center gap-2 max-w-[28rem] sm:w-[28rem] sm:border border-accent-400 sm:py-16 sm:px-10 rounded-2xl">
        <Logo type="basic" />

        <h3 className="my-4 text-accent-500 text-xl font-light capitalize">
          Create an account
        </h3>

        {/* SIGN UP USING OAUTH */}
        <SignInButton />

        <div className="flex items-center gap-2 w-full my-3">
          <hr className="border border-accent-500/50 w-[35%] ml-auto" />
          <p className="font-light text-accent-500 text-center text-sm">or</p>
          <hr className="border border-accent-500/50 w-[35%] mr-auto" />
        </div>

        {/* ALERT BOX - NO CUSTOM SIGNUPS */}
        <div className="w-[18.5rem]">
          <NoCustomSignupsAlert />
        </div>

        {/* SIGN UP USING SUPABASE */}
        <div className="opacity-50 cursor-not-allowed">
          {/* <form action={signupSupabase} className="flex flex-col gap-6 "> */}
          <form className="flex flex-col gap-6 ">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name*"
              required
              disabled
              className="py-2 px-1 w-[18.5rem] rounded-md text-primary-950 placeholder:text-accent-600 cursor-not-allowed"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address*"
              required
              disabled
              className="py-2 px-1 w-[18.5rem] rounded-md text-primary-950 placeholder:text-accent-600 cursor-not-allowed"
            />
            <input
              type="password"
              name="password"
              placeholder="Password*"
              required
              disabled
              className="py-2 px-1 w-[18.5rem] rounded-md text-primary-950 placeholder:text-accent-600 cursor-not-allowed"
            />
            <button
              disabled
              className="w-full py-2 text-xl text-accent-600 font-semibold border-2 border-accent-600 rounded-lg hover:text-primary-950 hover:bg-accent-600 transition-all cursor-not-allowed"
            >
              Sign Up
            </button>
          </form>
        </div>

        <p className="text-sm font-light mt-2">
          Already have an Account?{" "}
          <Link
            href="/login"
            className="text-accent-500 font-semibold text-base underline decoration-1 underline-offset-2"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
