"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import ButtonFilter from "./ButtonFilter";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      <ButtonFilter
        handleFilter={handleFilter}
        filter="all"
        activeFilter={activeFilter}
        className="px-5 py-2 hover:bg-primary-700"
      >
        All cabin
      </ButtonFilter>
      <ButtonFilter
        handleFilter={handleFilter}
        filter="small"
        activeFilter={activeFilter}
        className="px-5 py-2 hover:bg-primary-700"
      >
        1&mdash;3 guests
      </ButtonFilter>
      <ButtonFilter
        handleFilter={handleFilter}
        filter="medium"
        activeFilter={activeFilter}
        className="px-5 py-2 hover:bg-primary-700"
      >
        4&mdash;7 guests
      </ButtonFilter>
      <ButtonFilter
        handleFilter={handleFilter}
        filter="large"
        activeFilter={activeFilter}
        className="px-5 py-2 hover:bg-primary-700"
      >
        8&mdash;12 guests
      </ButtonFilter>
    </div>
  );
}

export default Filter;
