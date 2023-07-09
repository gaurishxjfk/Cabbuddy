"use client";
import React, { useReducer, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import InputText from "../InpComp/InputText";
import Link from "next/link";
import { initialState, reducer } from "@/lib/appReducer";
import axios from "axios";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [errMsg, setErrMsg] = useState("");

  const handleChange = (field: string, value: string, error: boolean) => {
    console.log("hosana", value);
    dispatch({ type: "CHANGE_INPUT", field, value, error });
  };
  const onRegister = async () => {
    try {
      const response = await axios.post("/api/users/register", state);
      console.log("hehehehe", response);
    } catch (error: any) {
      console.log("heheheh22e", error.response.data.error);
      setErrMsg(error.response.data.error);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Check if any field is empty
    Object.entries(state).forEach(([key, value]) => {
      dispatch({
        type: "CHANGE_INPUT",
        field: key,
        value: value.value,
        error: value.value.length === 0,
      });

      if (key === "password" && value.value.length < 6) {
        dispatch({
          type: "CHANGE_INPUT",
          field: "password",
          value: value.value,
          error: true,
        });
      }

      if (
        key === "confirmPassword" &&
        state.password.value !== state.confirmPassword.value
      ) {
        dispatch({
          type: "CHANGE_INPUT",
          field: "confirmPassword",
          value: state.confirmPassword.value,
          error: true,
        });
      }
    });

    const checkIfError = Object.values(state).some(
      ({ value, error }) => error === true || value.length === 0
    );
    if (!checkIfError) {
      await onRegister();
    }
  };
  return (
    <section className="w-[80%] md:w-1/2 mx-auto">
      <h1 className="text-center bg-white p-4 md:px-8 rounded-xl shadow-2xl text-darkText text-xl font-bold mb-2">
        Register
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 md:px-8 rounded-xl shadow-2xl text-center"
      >
        <div className="flex flex-col md:flex-row gap-4 my-2 text-left">
          <InputText
            label="First Name"
            name="fname"
            value={state.fname.value}
            handleChange={handleChange}
            placeholder="Elon"
            type="text"
            error={state.fname.error}
            errormsg="First Name is required"
          />

          <InputText
            label="Last Name"
            name="lname"
            value={state.lname.value}
            handleChange={handleChange}
            placeholder="Musk"
            type="text"
            error={state.lname.error}
            errormsg="Last Name is required"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4 my-2 text-left">
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
        </div>
        <div className="flex flex-col md:flex-row gap-4 my-2 text-left">
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

          <InputText
            label="Confirm Password"
            name="confirmPassword"
            value={state.confirmPassword.value}
            handleChange={handleChange}
            placeholder="******"
            type="password"
            error={state.confirmPassword.error}
            errormsg="Passwords are not matching"
          />
        </div>
        <p className="text-red-500 text-sm">{errMsg}</p>
        <button
          type="submit"
          className="bg-darkText py-2 mt-3 rounded-lg text-white font-bold w-1/2"
        >
          Register
        </button>
        <div>
          Already have an account?{" "}
          <Link href="/auth/login" className="text-cyan-800">
            Login
          </Link>
        </div>
      </form>
      <h1 className="text-center bg-white p-4 md:px-8 rounded-xl shadow-2xl text-darkText text-xl font-bold mt-2">
        Register
      </h1>
    </section>
  );
};

export default Register;
