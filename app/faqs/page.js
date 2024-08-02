import Link from "next/link";
import FAQpage from "@/app/_components/FAQpage";
import Footer from "@/app/_components/Footer";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 my-8">
      {/* HEADING */}
      <div className=" flex items-center justify-between gap-2 ">
        <h2 className="flex-1 text-7xl font-semibold text-accent-500">
          Questions?
        </h2>
        <p className="flex-1 text-xl font-light self-end">
          If you have questions, we have answers for you here. In case we
          don&apos;t, please feel free to{" "}
          <Link
            href="/contact"
            className="text-accent-500 underline underline-offset-4 decoration-1"
          >
            Contact Us
          </Link>
          .
        </p>
      </div>

      {/* FAQS SECTION */}
      <FAQpage />

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
