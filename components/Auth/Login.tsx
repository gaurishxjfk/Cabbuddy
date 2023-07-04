"use client";
import React, { useReducer } from "react";

import InputText from "../InpComp/InputText";
import Link from "next/link";
import { LoginInitialState, loginReducer } from "@/lib/appReducer";

const Login = () => {
  const [state, dispatch] = useReducer(loginReducer, LoginInitialState);

  const handleChange = (field: string, value: string, error: boolean) => {
    console.log("hosana", value);
    dispatch({ type: "CHANGE_INPUT", field, value, error });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Check if any field is empty
    Object.entries(state).forEach(([key, value]) => {
      dispatch({
        type: "CHANGE_INPUT",
        field: key,
        value: value.value,
        error: value.value.length === 0,
      });
    });
  };
  return (
    <section className="w-[80%] md:w-1/2 mx-auto">
      <h1 className="text-center bg-white p-4 md:px-8 rounded-xl shadow-2xl text-darkText text-xl font-bold mb-2">
        Login
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 md:px-8 rounded-xl shadow-2xl text-center"
      >
        <div className="flex flex-col gap-4 my-2 text-left">
          <InputText
            label="Email"
            name="email"
            value={state.email.value}
            handleChange={handleChange}
            placeholder="elon@cabbudy.com"
            type="email"
            error={state.email.error}
            errormsg="Email is required"
          />
          <InputText
            label="Password"
            name="password"
            value={state.password.value}
            handleChange={handleChange}
            placeholder="******"
            type="password"
            error={state.password.error}
            errormsg="Password should be atleast 6 characters"
          />
        </div>
        <button
          type="submit"
          className="bg-darkText py-2 mt-3 rounded-lg text-white font-bold w-1/2"
        >
          Login
        </button>
        <div>
          Dont have an account?{" "}
          <Link href="/auth/register" className="text-cyan-800">
            Register
          </Link>
        </div>
      </form>
      <h1 className="text-center bg-white p-4 md:px-8 rounded-xl shadow-2xl text-darkText text-xl font-bold mt-2">
        Login
      </h1>
    </section>
  );
};

export default Login;
