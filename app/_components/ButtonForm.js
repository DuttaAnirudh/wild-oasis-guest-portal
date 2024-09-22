"use client";

import { useFormStatus } from "react-dom";
import SpinnerMini from "./SpinnerMini";

function ButtonForm({ alignment, children }) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="bg-accent-500 px-4 py-1.5 lg:px-8 lg:py-4 text-primary-800 font-semibold
       hover:bg-accent-600 transition-all disabled:cursor-not-allowed 
       disabled:bg-gray-500 disabled:text-gray-300 rounded-lg"
    >
      {pending ? <SpinnerMini /> : children}
    </button>
  );
}

export default ButtonForm;
