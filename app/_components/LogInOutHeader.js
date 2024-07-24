import Link from "next/link";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { auth } from "@/app/_lib/auth";
import { signOutAction } from "@/app/_lib/actions";

export default async function LogInOutHeader() {
  const session = await auth();

  return (
    <>
      {!session?.user?.image ? (
        <div className="flex items-center gap-4">
          {/* LOGIN BUTTON */}
          <Link
            href="/login"
            className="z-10 bg-accent-600 px-6 py-1.5  text-primary-950
  rounded-2xl border border-primary-50/20
   transition-colors flex items-center gap-2  
   text-lg "
          >
            Login
          </Link>

          {/* SIGN UP BUTTON */}
          <Link
            href="/signup"
            className="z-10 bg-primary-50/5 backdrop-blur-lg px-6 py-1.5 
  rounded-2xl border border-primary-50/20 hover:bg-accent-400
   hover:text-primary-950 transition-colors flex items-center gap-2  
   text-lg "
          >
            Signup
          </Link>
        </div>
      ) : (
        // USER IMAGE
        <div className="flex item-center gap-3">
          <img
            src={session?.user?.image}
            className="h-10 rounded-full z-10"
            alt={session.user.name}
            referrerPolicy="no-refer"
          />
          {/* LOGOUT BUTTON */}
          <form action={signOutAction}>
            <button
              className="z-10 bg-primary-50/5 backdrop-blur-lg px-6 py-1.5 
  rounded-2xl border border-primary-50/20 hover:bg-accent-400
   hover:text-primary-950 transition-colors flex items-center gap-2  
   text-lg "
            >
              Logout{" "}
              <span className="w-4 h-4 ">
                <ArrowRightStartOnRectangleIcon />
              </span>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
