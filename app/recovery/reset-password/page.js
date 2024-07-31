import Logo from "@/app/_components/Logo";
import ResetPasswordForm from "@/app/_components/ResetPasswordForm";

export const metadata = {
  title: "Reset Password",
};

export default function Page({ searchParams }) {
  const sessionCode = searchParams.code;

  return (
    <div className="flex flex-col items-center justify-center h-full w-[30rem] mx-auto">
      <div className="flex flex-col items-center justify-center gap-2 w-[28rem] border border-accent-400 py-16 px-10 rounded-2xl">
        <Logo />

        <h3 className="my-4 text-accent-500 text-xl font-light capitalize">
          Set New Password
        </h3>

        {/* RESET SUPABASE ACCOUNT PASSWORD */}
        <ResetPasswordForm sessionCode={sessionCode} />
      </div>
    </div>
  );
}
