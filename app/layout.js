import Header from "./_components/Header";

import "@/app/_styles/globals.css";
import { Josefin_Sans, Caveat } from "next/font/google";
import { ReservationProvider } from "./_context/ReservationContext";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const caveat = Caveat({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "The Wild Oasis: %s",
    default: "The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolom, meets surrounded by beautiful mountains and dark forests",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} antialiased bg-primary-950 
        text-primary-100 min-h-screen flex flex-col`}
      >
        <Header />
        <div className="flex-1 grid">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
        <p className="text-center py-3">
          &copy; Copyright Wild Oasis {new Date().getFullYear()}
        </p>
      </body>
    </html>
  );
}
