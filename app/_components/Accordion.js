"use client";

function Accordion({ id, title, text, curOpen, setCurOpen }) {
  const isOpen = id === curOpen;

  function handleToggle() {
    setCurOpen(isOpen ? null : id);
  }

  return (
    <div
      onClick={handleToggle}
      className={`flex flex-col items-start justify-start w-full border-b 
        pb-1.5 sm:pb-2.5 md:pb-3.5 lg:pb-4 mt-4 sm:mt-6 md:mt-8 lg:mt-12 px-8 
        cursor-pointer group hover:border-accent-500 transition-all ${
          isOpen ? "border-accent-500 " : ""
        }`}
    >
      <div className="flex items-start justify-between gap-4 w-full max-[500px]:text-xl text-2xl">
        <p
          className={`font-light ${
            isOpen ? "text-accent-500 max-[500px]:text-2xl text-3xl" : ""
          }`}
        >
          {title}
        </p>
        <p className="group-hover:text-accent-500 transition-all ">
          {isOpen ? "-" : "+"}
        </p>
      </div>

      {isOpen && (
        <div className="py-2 text-xl font-light text-primary-50 ">{text}</div>
      )}
    </div>
  );
}

export default Accordion;
