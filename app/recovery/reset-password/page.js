import Logo from "@/app/_components/Logo";
import { resetPassword } from "@/app/_lib/actions";

export const metadata = {
  title: "Reset Password",
};

export default function Page({ searchParams }) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-[30rem] mx-auto">
      <div className="flex flex-col items-center justify-center gap-2 w-[28rem] border border-accent-400 py-16 px-10 rounded-2xl">
        <Logo />

        <h3 className="my-4 text-accent-500 text-xl font-light capitalize">
          Set New Password
        </h3>

        {/* SIGN IN USING SUPABASE */}
        <form action={resetPassword} className="flex flex-col gap-6">
          <input
            type="password"
            name="password"
            placeholder="New Password"
            required
            className="py-2 px-1 w-[18.5rem] rounded-md text-primary-950 placeholder:text-accent-600"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            required
            className="py-2 px-1 w-[18.5rem] rounded-md text-primary-950 placeholder:text-accent-600"
          />

          <input
            type="text"
            name="sessionCode"
            value={searchParams.code}
            required
            className="hidden"
          />

          <button className="w-full py-2 text-xl text-accent-600 font-semibold border-2 border-accent-600 rounded-lg hover:text-primary-950 hover:bg-accent-600 transition-all">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
