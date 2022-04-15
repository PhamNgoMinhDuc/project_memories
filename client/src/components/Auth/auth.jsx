/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import GoogleLogin from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye, AiOutlineGooglePlus } from "react-icons/ai";

import { signin, signup } from "../../redux/actions/authAction";

import NavBar from "../navBar/navBar";
import { useTranslation } from "react-i18next";

const auth = () => {
  const [isSignIn, setSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formDataSignIn, setformDataSignIn] = useState({ email: "", password: "" });
  const [formDataSignUp, setformDataSignUp] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
  const [errorSigIn, setErrorSigIn] = useState({ email: "", password: "" });
  const [errorSigUp, setErrorSigUp] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
  const { t } = useTranslation();
  const errSignIn = useSelector((state) => state.posts.err.errSignIn);
  const errSignUp = useSelector((state) => state.posts.err.errSignUp);
  const lng = localStorage.getItem("i18nextLng");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSwitch = () => {
    setSignIn(!isSignIn);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChangeSignIn = (e) => {
    setformDataSignIn({ ...formDataSignIn, [e.target.name]: e.target.value });
  };
  const handleChangeSignUp = (e) => {
    setformDataSignUp({ ...formDataSignUp, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setErrorSigIn(errSignIn);
  }, [errSignIn]);

  useEffect(() => {
    setErrorSigUp(errSignUp);
  }, [errSignUp]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignIn) {
      dispatch(signin(formDataSignIn, navigate));
    } else {
      dispatch(signup(formDataSignUp, navigate));
    }
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log(error);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <NavBar />

      <form onSubmit={handleSubmit}>
        <div className=" w-96 h-auto border-2 rounded-[10px] p-4  px-4 py-2 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.5)] dark:bg-[#242526] dark:text-[#dddee3] dark:border-black flex flex-col  items-center">
          {!isSignIn ? (
            <>
              <h1 className="my-5 text-4xl font-semibold">{t("form.signUp")}</h1>
              <div className="flex felx-row gap-4">
                <input
                  type="text"
                  name="firstName"
                  onChange={handleChangeSignUp}
                  placeholder={t("form.firtsName")}
                  className="w-full border-2 border-[rgb(200 201 203 / 50%)] h-15 mt-5 py-2 px-4 placeholder:text-black dark:bg-[#3a3b3c] dark:placeholder:text-[#e4e6eb] dark:border-black"
                />
                <input
                  type="text"
                  name="lastName"
                  onChange={handleChangeSignUp}
                  placeholder={t("form.lastName")}
                  className="w-full border-2 border-[rgb(200 201 203 / 50%)] h-15 mt-5 py-2 px-4 placeholder:text-black dark:bg-[#3a3b3c] dark:placeholder:text-[#e4e6eb] dark:border-black"
                />
              </div>
              {errorSigUp && <div className=" text-error">{errorSigUp.firstName}</div>}
              {errorSigUp && <div className=" text-error">{errorSigUp.lastName}</div>}
              {errorSigUp &&
                (lng === "en" ? <div className="text-error">{errorSigUp.firstName}</div> : errorSigUp.firstName === "First name is empty" ? <div className="text-error">Họ rỗng</div> : "")}
              {errorSigUp && (lng === "en" ? <div className="text-error">{errorSigUp.lastName}</div> : errorSigUp.lastName === "Last name is empty" ? <div className="text-error">Tên rỗng</div> : "")}

              <input
                type="email"
                name="email"
                onChange={handleChangeSignUp}
                placeholder={t("form.email")}
                className="w-full border-2 border-[rgb(200 201 203 / 50%)] h-15 mt-5 py-2 px-4 placeholder:text-black dark:bg-[#3a3b3c] dark:placeholder:text-[#e4e6eb] dark:border-black"
              />
              {errorSigUp && <div className=" text-error">{errorSigUp.email}</div>}
              {errorSigUp &&
                (lng === "en" ? (
                  <div className="text-error">{errorSigUp.email}</div>
                ) : errorSigUp.email === "Email is empty" ? (
                  <div className="text-error">Tài khoản rỗng</div>
                ) : errorSigUp.email === "User doesn't exist." ? (
                  <div className="text-error">Tài khoản không hợp lệ</div>
                ) : (
                  ""
                ))}
              <div className="w-full relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChangeSignUp}
                  placeholder={t("form.password")}
                  className="w-full border-2 border-[rgb(200 201 203 / 50%)] h-15 mt-5 py-2 px-4 placeholder:text-black dark:bg-[#3a3b3c] dark:placeholder:text-[#e4e6eb] dark:border-black"
                />
                {errorSigUp && <div className=" text-error">{errorSigUp.password}</div>}
                {errorSigUp &&
                  (lng === "en" ? (
                    <div className="text-error">{errorSigUp.password}</div>
                  ) : errorSigUp.password === "Password is empty" ? (
                    <div className="text-error">Tài khoản rỗng</div>
                  ) : errorSigUp.password === "Password don't match." ? (
                    <div className="text-error">Mật khẩu giống nhau</div>
                  ) : (
                    ""
                  ))}
              </div>
              <div className="w-full relative">
                <input
                  type="password"
                  name="confirmPassword"
                  onChange={handleChangeSignUp}
                  placeholder={t("form.repeatPassword")}
                  className="w-full border-2 border-[rgb(200 201 203 / 50%)] h-15 mt-5 py-2 px-4 placeholder:text-black dark:bg-[#3a3b3c] dark:placeholder:text-[#e4e6eb] dark:border-black"
                />
                {errorSigUp && <div className=" text-error">{errorSigUp.confirmPassword}</div>}
                {errorSigUp &&
                  (lng === "en" ? (
                    <div className="text-error">{errorSigUp.confirmPassword}</div>
                  ) : errorSigUp.confirmPassword === "Confirm password is empty" ? (
                    <div className="text-error">Mật khẩu xác nhận rỗng</div>
                  ) : (
                    ""
                  ))}
              </div>
              <button type="submit" className=" bg-blue-600 text-white w-full py-1 my-4 rounded-[5px] cursor-pointer">
                {t("form.signUp")}
              </button>
              <div className="flex gap-1 justify-center items-center">
                <h4>{t("form.signUpHave")}</h4>
                <button className="border border-black rounded-[5px] text-white p-1 bg-blue-600" onClick={handleSwitch}>
                  {t("form.signIn")}
                </button>
              </div>
            </>
          ) : (
            <>
              <h1 className="my-5 text-4xl font-semibold">{t("form.signIn")}</h1>
              <input
                type="email"
                name="email"
                onChange={handleChangeSignIn}
                placeholder={t("form.email")}
                className="w-full border-2 border-[rgb(200 201 203 / 50%)] h-15 mt-5 py-2 px-4 placeholder:text-black dark:bg-[#3a3b3c] dark:placeholder:text-[#e4e6eb] dark:border-black"
              />
              {errorSigIn &&
                (lng === "en" ? (
                  <div className="text-error">{errorSigIn.email}</div>
                ) : errorSigIn.email === "Email is empty" ? (
                  <div className="text-error">Tài khoản rỗng</div>
                ) : errorSigIn.email === "User doesn't exist." ? (
                  <div className="text-error">Tài khoản không hợp lệ</div>
                ) : (
                  ""
                ))}

              <div className="w-full relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChangeSignIn}
                  placeholder={t("form.password")}
                  className="w-full border-2 border-[rgb(200 201 203 / 50%)] h-15 mt-5 py-2 px-4 placeholder:text-black dark:bg-[#3a3b3c] dark:placeholder:text-[#e4e6eb] dark:border-black"
                />
                {errorSigIn &&
                  (lng === "en" ? (
                    <div className="text-error">{errorSigIn.password}</div>
                  ) : errorSigIn.password === "Password is empty" ? (
                    <div className="text-error">Mật khẩu rỗng</div>
                  ) : errorSigIn.password === "Invalid credentials" ? (
                    <div className="text-error">Mật khẩu sai</div>
                  ) : (
                    ""
                  ))}
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
                {t("form.signIn")}
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
                    {t("form.signInGG")}
                  </button>
                )}
                className="w-full mb-4 rounded-[5px] cursor-pointer"
              />
              <div className="flex gap-1 justify-center items-center">
                <h4>{t("form.signInDont")}</h4>
                <button className="border border-black rounded-[5px] text-white p-1 bg-blue-600" onClick={handleSwitch}>
                  {t("form.signUp")}
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
