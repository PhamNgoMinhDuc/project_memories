import React, { useState } from "react";

import memories from "../../images/memories.png";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const navBar = (props) => {
  const { isMobile } = props;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [openMenu, setOpenMenu] = useState(false);
  const handlMenu = () => {
    setOpenMenu(!openMenu);
  };
  return (
    <div className="fixed w-full top-0 z-50 bg-white flex items-center justify-between border-1 border-black px-8 py-2 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.5)]">
      <div className=" flex gap-2 font-bold text-3xl ">
        MEMORIE
        <img src={memories} width={32} alt="" />
      </div>
      <div className=" flex items-center gap-10 font-normal">
        {!openMenu && isMobile ? (
          <AiOutlineMenu className=" cursor-pointer" onClick={handlMenu} />
        ) : openMenu && isMobile ? (
          <AiOutlineClose className=" cursor-pointer" onClick={handlMenu} />
        ) : (
          <>
            <ul className="flex items-center justify-center gap-6">
              <li>PNMD Duc</li>
              <li>Dark Mode</li>
              <li>
                <button className=" bg-red-600 text-white px-2 py-1 rounded-[5px] cursor-pointer">LOGUOT</button>
              </li>
            </ul>
          </>
        )}
        {openMenu && (
          <ul className="  absolute top-12 right-8 bg-white border-black px-4 py-2 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.5)] before-menu">
            <li>PNMD Duc</li>
            <li>Dark Mode</li>
            <li>LOGUOT</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default navBar;
