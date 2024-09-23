import Navigation from "@/app/_components/Navigation";
import Logo from "@/app/_components/Logo";
import MobileHeader from "./MobileHeader";
import MobileNavigation from "./MobileNavigation";

function Header() {
  return (
    <header className="px-2 md:px-5 lg:px-8 py-5 sticky top-0 z-[20]">
      <div className="flex justify-between items-center max-w-7xl mx-auto ">
        <Logo />
        <Navigation />
        <MobileHeader /> {/* Login/Logout + Mobile Navigation */}
      </div>
    </header>
  );
}

export default Header;
