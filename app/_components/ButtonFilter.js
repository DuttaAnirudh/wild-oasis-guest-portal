"use client";

function ButtonFilter({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      onClick={() => handleFilter(filter)}
      className={`px-3 sm:px-5 py-2 ${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
      } hover:bg-primary-500 text-sm sm:text-base`}
    >
      {children}
    </button>
  );
}

export default ButtonFilter;
