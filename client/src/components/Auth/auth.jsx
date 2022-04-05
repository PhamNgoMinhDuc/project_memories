/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye, AiOutlineGooglePlus } from "react-icons/ai";

import { signin, signup } from "../../redux/actions/authAction";

import NavBar from "../navBar/navBar";

const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" };

const auth = (props) => {
  const { isMobile } = props;
  const [isSignIn, setSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSwitch = () => {
    setSignIn(!isSignIn);
  };

  console.log(formData);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignIn) {
      dispatch(signin(formData, navigate));
    } else {
      dispatch(signup(formData, navigate));
    }
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log(error);
  };

  return (
    <div className=" h-screen flex justify-center items-center">
      <NavBar isMobile={isMobile} />
      <form onSubmit={handleSubmit}>
        <div className=" w-96 h-auto border-2 rounded-[10px] p-4  px-4 py-2 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.5)] dark:bg-[#242526] dark:text-[#dddee3] dark:border-black flex flex-col  items-center">
          {!isSignIn ? (
            <>
              <h1 className="my-5 text-4xl font-semibold">Sign Up</h1>
              <div className="flex felx-row gap-4">
                <input
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  placeholder="FirstName"
                  className="w-full border-2 border-[rgb(200 201 203 / 50%)] h-15 mt-5 py-2 px-4 placeholder:text-black dark:bg-[#3a3b3c] dark:placeholder:text-[#e4e6eb] dark:border-black"
                />
                <input
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  placeholder="LastName"
                  className="w-full border-2 border-[rgb(200 201 203 / 50%)] h-15 mt-5 py-2 px-4 placeholder:text-black dark:bg-[#3a3b3c] dark:placeholder:text-[#e4e6eb] dark:border-black"
                />
              </div>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Email Adress"
                className="w-full border-2 border-[rgb(200 201 203 / 50%)] h-15 mt-5 py-2 px-4 placeholder:text-black dark:bg-[#3a3b3c] dark:placeholder:text-[#e4e6eb] dark:border-black"
              />
              <div className="w-full relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full border-2 border-[rgb(200 201 203 / 50%)] h-15 mt-5 py-2 px-4 placeholder:text-black dark:bg-[#3a3b3c] dark:placeholder:text-[#e4e6eb] dark:border-black"
                />
                {showPassword ? (
                  <>
                    <AiFillEyeInvisible size={22} className="absolute top-8 right-4 cursor-pointer" onClick={handleShowPassword} />
                  </>
                ) : (
                  <>
                    <AiFillEye size={22} className="absolute top-8 right-4 cursor-pointer" onClick={handleShowPassword} />
                  </>
                )}
              </div>
              <div className="w-full relative">
                <input
                  type={showRepeatPassword ? "text" : "password"}
                  name="confirmPassword"
                  onChange={handleChange}
                  handleShowPassword={handleShowRepeatPassword}
                  placeholder="Repeat password"
                  className="w-full border-2 border-[rgb(200 201 203 / 50%)] h-15 mt-5 py-2 px-4 placeholder:text-black dark:bg-[#3a3b3c] dark:placeholder:text-[#e4e6eb] dark:border-black"
                />
                {showRepeatPassword ? (
                  <>
                    <AiFillEyeInvisible size={22} className="absolute top-8 right-4 cursor-pointer" onClick={handleShowRepeatPassword} />
                  </>
                ) : (
                  <>
                    <AiFillEye size={22} className="absolute top-8 right-4 cursor-pointer" onClick={handleShowRepeatPassword} />
                  </>
                )}
              </div>
              <button type="submit" className=" bg-blue-600 text-white w-full py-1 my-4 rounded-[5px] cursor-pointer">
                SIGN UP
              </button>
              <div className="flex gap-1 justify-center items-center">
                <h4>You have a account!</h4>
                <button className="border border-black rounded-[5px] text-white p-1 bg-blue-600" onClick={handleSwitch}>
                  SIGN IN
                </button>
              </div>
            </>
          ) : (
            <>
              <h1 className="my-5 text-4xl font-semibold">Sign In</h1>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Email Adress"
                className="w-full border-2 border-[rgb(200 201 203 / 50%)] h-15 mt-5 py-2 px-4 placeholder:text-black dark:bg-[#3a3b3c] dark:placeholder:text-[#e4e6eb] dark:border-black"
              />

              <div className="w-full relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full border-2 border-[rgb(200 201 203 / 50%)] h-15 mt-5 py-2 px-4 placeholder:text-black dark:bg-[#3a3b3c] dark:placeholder:text-[#e4e6eb] dark:border-black"
                />
                {showPassword ? (
                  <>
                    <AiFillEyeInvisible size={22} className="absolute top-8 right-4 cursor-pointer" onClick={handleShowPassword} />
                  </>
                ) : (
                  <>
                    <AiFillEye size={22} className="absolute top-8 right-4 cursor-pointer" onClick={handleShowPassword} />
                  </>
                )}
              </div>

              <button type="submit" className=" bg-blue-600 text-white w-full py-1 mt-4 mb-2 rounded-[5px] cursor-pointer">
                SIGN IN
              </button>
              <GoogleLogin
                clientId="190369296996-pger4nmb679in8hg76d7mqgo6ngk6sgp.apps.googleusercontent.com"
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy="single_host_origin"
                render={(renderProps) => (
                  <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className=" bg-blue-600 text-white w-full py-1 mb-4 rounded-[5px] cursor-pointer flex justify-center items-center gap-1"
                  >
                    <AiOutlineGooglePlus size={24} />
                    GOOGLE SIGN IN
                  </button>
                )}
                className="w-full mb-4 rounded-[5px] cursor-pointer"
              />
              <div className="flex gap-1 justify-center items-center">
                <h4>You don't have a account!</h4>
                <button className="border border-black rounded-[5px] text-white p-1 bg-blue-600" onClick={handleSwitch}>
                  SIGN UP
                </button>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default auth;
