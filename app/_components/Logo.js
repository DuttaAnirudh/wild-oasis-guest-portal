import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-1 sm:gap-2 md:gap-4 z-10">
      <div className="relative h-6 md:h-8 lg:h-10 w-6 md:w-8 lg:w-10">
        <Image
          src={logo}
          fill
          className="object-cover"
          quality={100}
          alt="The Wild Oasis logo"
        />
      </div>
      <span className="text-base md:text-lg lg:text-xl font-semibold text-primary-100 uppercase pt-1 sm:pt-1.5 md:pt-2">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;
