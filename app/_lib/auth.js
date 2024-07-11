import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    //Returns either TRUE or FALSE
    // True === current user is authorized to move to PROTECTED ROUTE
    // False === use NOT authorized to move onto PROTECTED ROUTE
    // Next auth calls this function whenever someone tries to access the protected route
    authorized({ auth, request }) {
      return !!auth?.user;
    },

    // Runs AFTER getting the credentials & BEFORE signing in the user
    // acts like a Middleware
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user.email);

        if (!existingGuest) {
          await createGuest({ email: user.email, fullName: user.name });
        }

        return true;
      } catch {
        return false;
      }
    },

    // Runs AFTER Signin
    // mutate the session data
    async session({ session, user }) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
