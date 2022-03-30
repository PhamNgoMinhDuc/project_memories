/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import decode from "jwt-decode";

import memories from "../../images/memories.png";

import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { BsFillSunFill } from "react-icons/bs";
import { FaMoon } from "react-icons/fa";

import useDarkMode from "../../useDarkMode";

const navBar = (props) => {
  const { isMobile } = props;
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [openMenu, setOpenMenu] = useState(false);
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handlMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });

    navigate("/");

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    /*     const decodedToken = decode(token);
    if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout(); */

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <div className="fixed w-full top-0 z-50 bg-white flex items-center justify-between border-1 border-black px-8 py-2 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.5)] dark:bg-[#242526] dark:text-[#dddee3]">
      <Link to="/">
        <div className=" flex gap-2 font-bold text-3xl ">
          MEMORIE
          <img src={memories} width={32} alt="" />
        </div>
      </Link>

      <div className=" flex items-center gap-10 font-normal">
        {!openMenu && isMobile ? (
          <AiOutlineMenu className=" cursor-pointer" onClick={handlMenu} />
        ) : openMenu && isMobile ? (
          <AiOutlineClose className=" cursor-pointer" onClick={handlMenu} />
        ) : (
          <>
            <ul className="flex items-center justify-center gap-6">
              <li>
                {isDarkMode ? (
                  <>
                    <div className="flex gap-2 cursor-pointer" onClick={() => toggleDarkMode(!isDarkMode)}>
                      <BsFillSunFill size={24} color="#ffeb3b" />
                      LightMode
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex gap-2 cursor-pointer" onClick={() => toggleDarkMode(!isDarkMode)}>
                      <FaMoon size={24} color="#885dec" />
                      DarkMode
                    </div>
                  </>
                )}
              </li>
              {user ? (
                <>
                  <div className="flex items-center justify-center gap-5">
                    <li>PNMD</li>
                    <li>
                      <button onClick={handleLogout} className=" bg-red-600 btn">
                        LOGUOT
                      </button>
                    </li>
                  </div>
                </>
              ) : (
                <li>
                  <Link to="/auth">
                    <button className=" bg-blue-600 btn">LOGIN</button>
                  </Link>
                </li>
              )}
            </ul>
          </>
        )}
        {openMenu && (
          <ul className="absolute top-12 right-8 bg-white border-black px-4 py-2 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.5)] before-menu">
            <li>
              {isDarkMode ? (
                <>
                  <div className="flex gap-2 cursor-pointer" onClick={() => toggleDarkMode(!isDarkMode)}>
                    <BsFillSunFill size={24} color="#ffeb3b" />
                    LightMode
                  </div>
                </>
              ) : (
                <div className="flex gap-2 cursor-pointer" onClick={() => toggleDarkMode(!isDarkMode)}>
                  <FaMoon size={24} color="#885dec" />
                  DarkMode
                </div>
              )}
            </li>
            {user ? (
              <>
                <div className="">
                  <li>PNMD</li>
                  <li>
                    <button className=" bg-red-600 btn">LOGUOT</button>
                  </li>
                </div>
              </>
            ) : (
              <li>
                <Link to="/auth">
                  <button className=" bg-blue-600 btn">LOGIN</button>
                </Link>
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default navBar;
