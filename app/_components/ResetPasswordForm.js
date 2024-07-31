"use client";

import { useState } from "react";
import { resetPassword } from "../_lib/actions";

function ResetPasswordForm({ sessionCode }) {
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  function handleForm(formData) {
    if (password.password !== password.confirmPassword) {
      return setError("Passwords DO NOT MATCH!");
    }

    return resetPassword(formData);
  }

  function reset() {
    return setPassword({
      password: "",
      confirmPassword: "",
    });
  }

  return (
    <form
      action={async (formData) => {
        await handleForm(formData);
        reset();
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="password"
        name="password"
        placeholder="New Password"
        value={password.password}
        onChange={(e) =>
          setPassword((obj) => {
            return { ...obj, password: e.target.value };
          })
        }
        required
        className="py-2 px-1 w-[18.5rem] rounded-md text-primary-950 placeholder:text-accent-600 my-2"
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm New Password"
        value={password.confirmPassword}
        onChange={(e) =>
          setPassword((obj) => {
            return { ...obj, confirmPassword: e.target.value };
          })
        }
        required
        className="py-2 px-1 w-[18.5rem] rounded-md text-primary-950 placeholder:text-accent-600 my-2"
      />

      {error !== "" && <p className="text-red-500 text-sm">{error}</p>}

      <input
        type="text"
        name="sessionCode"
        value={sessionCode}
        required
        className="hidden"
      />

      <button className="w-full py-2 text-xl text-accent-600 font-semibold border-2 border-accent-600 rounded-lg hover:text-primary-950 hover:bg-accent-600 transition-all mt-2">
        Reset Password
      </button>
    </form>
  );
}

export default ResetPasswordForm;
