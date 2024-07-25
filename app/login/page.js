import SignInButton from "@/app/_components/SignInButton";
import Logo from "../_components/Logo";
import Link from "next/link";
import { loginSupabase } from "../_lib/actions";

export const metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-[30rem] mx-auto">
      <div className="flex flex-col items-center justify-center gap-2 w-[28rem] border border-accent-400 py-16 px-10 rounded-2xl">
        <Logo />

        <h3 className="my-4 text-accent-500 text-xl font-light capitalize">
          Log in to your account
        </h3>

        {/* SIGN IN USING OAUTH */}
        <SignInButton />

        <div className="flex items-center gap-2 w-full my-3">
          <hr className="border border-accent-500/50 w-[35%] ml-auto" />
          <p className="font-light text-accent-500 text-center text-sm">or</p>
          <hr className="border border-accent-500/50 w-[35%] mr-auto" />
        </div>

        {/* SIGN IN USING SUPABASE */}
        <form action={loginSupabase} className="flex flex-col gap-6">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="py-2 px-1 w-[18.5rem] rounded-md text-primary-950 placeholder:text-accent-600"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="py-2 px-1 w-[18.5rem] rounded-md text-primary-950 placeholder:text-accent-600"
          />

          <button className="w-full py-2 text-xl text-accent-600 font-semibold border-2 border-accent-600 rounded-lg hover:text-primary-950 hover:bg-accent-600 transition-all">
            Log In
          </button>
        </form>

        <p className="text-sm font-light mt-2">
          Don&apos;t have an Account?{" "}
          <Link
            href="/signup"
            className="text-accent-500 font-semibold text-base underline decoration-1 underline-offset-2"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
