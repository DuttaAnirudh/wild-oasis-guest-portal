import { auth } from "@/app/_lib/auth";
import useSupabaseUser from "@/app/_hooks/useSupabaseUser";

export const metadata = {
  title: "Guest Area",
};

export default async function Page() {
  const session = await auth();

  const { user } = await useSupabaseUser();

  let fullName;
  if (session) {
    fullName = session.user.name;
  }

  if (user) {
    fullName = user.user_metadata.fullName;
  }

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Welcome, {fullName?.split(" ").at(0)}
      </h2>
    </div>
  );
}
