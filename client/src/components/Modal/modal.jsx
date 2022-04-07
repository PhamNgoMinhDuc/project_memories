/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { AiOutlineClose } from "react-icons/ai";
import { BsFillSunFill } from "react-icons/bs";
import { FaMoon } from "react-icons/fa";

import useDarkMode from "../../useDarkMode";

const modal = (props) => {
  const { isShowing, hide, isMobile } = props;
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const [isDarkMode, toggleDarkMode] = useDarkMode();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });

    navigate("/home");

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    /* const decodedToken = decode(token);
    if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout(); */

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return isShowing ? (
    <div className="w-full h-screen fixed flex z-[1000]">
      <div className=" bg-[rgba(0,0,0,0.4)] h-full w-[80%]" onClick={hide}></div>
      <div className=" bg-white w-[20%] h-full relative flex flex-col p-10 items-center">
        <button className=" absolute cursor-pointer top-5 right-5" onClick={hide}>
          <AiOutlineClose className="" />
        </button>
        <h2 className=" text-xl font-bold">Menu</h2>

        <div className=" mt-20 w-full border-b-2"></div>
        {user ? (
          <>
            <div className="text-modal">{user.result.name}</div>
          </>
        ) : null}

        <div className="text-modal">
          {isDarkMode ? (
            <>
              <div className="flex justify-center items-center gap-2 cursor-pointer" onClick={() => toggleDarkMode(!isDarkMode)}>
                <BsFillSunFill size={20} color="#ffeb3b" />
                LightMode
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-center items-center gap-2 cursor-pointer" onClick={() => toggleDarkMode(!isDarkMode)}>
                <FaMoon size={20} color="#885dec" />
                DarkMode
              </div>
            </>
          )}
        </div>

        {user ? (
          <>
            <div className="text-modal">
              <button onClick={handleLogout} className=" bg-red-600 btn">
                LOGUOT
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-modal">
              <Link to="/auth">
                <button className="bg-blue-600 btn">LOGIN</button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  ) : null;
};

export default modal;
