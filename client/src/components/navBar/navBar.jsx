/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { AiOutlineMenu } from "react-icons/ai";

import memories from "../../images/memories.png";
import avatar from "../../images/avatar.jpg";
const navBar = (props) => {
  const { toggle } = props;

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch({ type: "LOGOUT" });

        navigate("/");

        window.location.reload();
        setUser(null);
      }
    }

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

      <div className=" flex gap-4 justify-center items-center">
        {!user && toggle ? (
          <Link to="/auth">
            <button className="bg-blue-600 btn">{t("btn.login")}</button>
          </Link>
        ) : user && toggle ? (
          <>
            <div className="flex justify-center items-center gap-3">
              <img className="rounded-full w-5 h-5" src={user?.result?.imageUrl || user?.result?.avatar || avatar} alt="" /> {user?.result?.name}
            </div>
          </>
        ) : null}
        {toggle ? (
          <button className=" cursor-pointer flex gap-2 items-center justify-center" onClick={toggle}>
            <AiOutlineMenu />
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default navBar;
