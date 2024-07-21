import Navigation from "@/app/_components/Navigation";
import Logo from "@/app/_components/Logo";
import LogInOutHeader from "./LogInOutHeader";

function Header() {
  return (
    <header className="border-b border-primary-900/10 px-8 py-5 sticky top-0 z-[20]">
      <div className="flex justify-between items-center max-w-7xl mx-auto ">
        <Logo />
        <Navigation />
        <LogInOutHeader />
      </div>
    </header>
  );
}

export default Header;
