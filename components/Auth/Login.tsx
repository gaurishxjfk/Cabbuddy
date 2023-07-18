"use client";
import React, { useReducer, useState } from "react";

import InputText from "../InpComp/InputText";
import Link from "next/link";
import { LoginInitialState, loginReducer } from "@/lib/appReducer";
import axios from "axios";
import { useRouter } from "next/navigation";
import { appStore } from "@/lib/appStore";

const Login = () => {
  let router = useRouter()
  const {updateUserInfo} = appStore(state => state)
  const [state, dispatch] = useReducer(loginReducer, LoginInitialState);
  const [errMsg, setErrMsg] = useState("");

  const handleChange = (field: string, value: string, error: boolean) => {
    console.log("hosana", value);
    dispatch({ type: "CHANGE_INPUT", field, value, error });
  };
  const onLogin = async () => {
    try {
      const response = await axios.post("/api/users/login", state);
      console.log(response,"chennai")
      setErrMsg("");
      getUserDetails();
      if(response.data?.user?.isAdmin){
        router.push("/admin")
      }else{
        router.push("/user/profile")
      }
      
    } catch (error: any) {
      console.log("heheheh22e", error.response.data.error);
      setErrMsg(error.response.data.error);
    }
  };

  const getUserDetails = async () => {
    console.log("its goinggg");
    const res = await axios.get("/api/users/profile");
    const {data} = res.data
    console.log("fuck ittt", res.data);
    updateUserInfo(data)
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    Object.entries(state).forEach(([key, value]) => {
      dispatch({
        type: "CHANGE_INPUT",
        field: key,
        value: value.value,
        error: value.value.length === 0,
      });
    });
    const checkIfError = Object.values(state).some(
      ({ value, error }) => error === true || value.length === 0
    );
    if (!checkIfError) {
      await onLogin();
    }
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
        <p className="text-red-500 text-sm">{errMsg}</p>
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
