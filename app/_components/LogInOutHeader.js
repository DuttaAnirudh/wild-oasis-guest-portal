import { logoutAction } from "@/app/_lib/actions";
import { auth } from "@/app/_lib/auth";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import useSupabaseUser from "@/app/_hooks/useSupabaseUser";

export default async function LogInOutHeader() {
  const session = await auth();

  const { user } = await useSupabaseUser();

  return (
    <>
      {!session && !user ? (
        <div className="flex items-center gap-1 md:gap-2 lg:gap-4">
          {/* LOGIN BUTTON */}
          <Link
            href="/login"
            className="z-10 bg-accent-600 px-2 min-[490px]:px-3 lg:px-6 py-0.5 min-[490px]:py-1 lg:py-1.5  text-primary-950
 rounded-lg lg:rounded-2xl border border-primary-50/20
   transition-colors flex items-center gap-2  
   text-sm min-[490px]:text-base md:text-lg "
          >
            Login
          </Link>

          {/* SIGN UP BUTTON */}
          <Link
            href="/signup"
            className="z-10 bg-primary-50/5 backdrop-blur-lg px-2 min-[490px]:px-3 lg:px-6 py-0.5 min-[490px]:py-1 lg:py-1.5
  rounded-lg lg:rounded-2xl border border-primary-50/20 hover:bg-accent-400
   hover:text-primary-950 transition-colors flex items-center gap-2  
   text-sm min-[490px]:text-base md:text-lg "
          >
            Signup
          </Link>
        </div>
      ) : (
        // USER IMAGE
        <div className="flex items-center gap-3">
          {session && (
            <img
              src={session?.user?.image}
              className="h-6 md:h-8 lg:h-10 rounded-full z-10"
              alt={session.user.name}
              referrerPolicy="no-refer"
            />
          )}
          {/* LOGOUT BUTTON */}
          <form action={logoutAction}>
            <button
              className="z-10 bg-primary-50/5 backdrop-blur-lg px-3 lg:px-6 py-1 lg:py-1.5
  rounded-lg lg:rounded-2xl border border-primary-50/20 hover:bg-accent-400
   hover:text-primary-950 transition-colors flex items-center gap-2  
   text-base md:text-lg"
            >
              Logout{" "}
              <span className="w-3 md:w-4 h-3 md:h-4 ">
                <ArrowRightStartOnRectangleIcon />
              </span>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
