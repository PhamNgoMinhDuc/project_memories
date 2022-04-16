/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { AiOutlineClose } from "react-icons/ai";
import { BsFillSunFill } from "react-icons/bs";
import { FaMoon } from "react-icons/fa";

import i18n from "../../i18n";
import useDarkMode from "../../useDarkMode";

import iconVietNam from "../../images/vietnam.png";
import iconEnglish from "../../images/english.png";

const modal = (props) => {
  const { isShowing, toggle, toggleUser } = props;

  const [isDarkMode, toggleDarkMode] = useDarkMode();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const lng = localStorage.getItem("i18nextLng");

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });

    navigate("/");

    window.location.reload();
    setUser(null);
  };

  return isShowing ? (
    <div className="w-full h-screen fixed flex z-[1000] ">
      <div className=" bg-[rgba(0,0,0,0.4)] h-full w-[80%]" onClick={toggle}></div>
      <div className={` bg-white w-[50%] sm:w-[40%] md:w-[30%] lg:w-[20%] h-full relative flex flex-col p-10 items-center dark:bg-black`}>
        <button className=" absolute cursor-pointer top-5 right-5" onClick={toggle}>
          <AiOutlineClose />
        </button>
        <h2 className=" text-xl font-bold">Menu</h2>

        <div className=" mt-20 w-full border-b-2"></div>
        {user && !user?.result?.googleId ? (
          <>
            <div className="text-modal">{user?.result?.name}</div>
            <div
              className="text-modal cursor-pointer"
              onClick={() => {
                toggle();
                toggleUser();
              }}
            >
              {t("modal.editProfile")}
            </div>
          </>
        ) : null}

        <div className="text-modal">
          {isDarkMode ? (
            <>
              <div className="flex justify-center items-center gap-2 cursor-pointer" onClick={() => toggleDarkMode(!isDarkMode)}>
                <BsFillSunFill size={20} color="#ffeb3b" />
                {t("modal.lightMode")}
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-center items-center gap-2 cursor-pointer" onClick={() => toggleDarkMode(!isDarkMode)}>
                <FaMoon size={20} color="#885dec" />
                {t("modal.darkMode")}
              </div>
            </>
          )}
        </div>
        <div className="text-modal flex gap-5">
          <button>
            <img src={iconVietNam} className={`w-full h-full ${lng === "en" ? "opacity-50" : ""}`} alt="iconVI" onClick={() => changeLanguage("vi")} />
          </button>
          <button>
            <img src={iconEnglish} className={`w-full h-full ${lng === "vi" ? "opacity-50" : ""}`} alt="iconEN" onClick={() => changeLanguage("en")} />
          </button>
        </div>

        {user ? (
          <>
            <div className="text-modal">
              <button onClick={handleLogout} className=" bg-red-600 btn">
                {t("btn.logout")}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-modal">
              <Link to="/auth">
                <button className="bg-blue-600 btn">{t("btn.login")}</button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  ) : null;
};

export default modal;
