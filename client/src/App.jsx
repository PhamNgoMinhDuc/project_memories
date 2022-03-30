import React, { useEffect, useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/Home/home";
import Auth from "./components/Auth/auth";
import NotFound from "./components/NotFound/notFound";

const App = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    const handleSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleSize);
    handleSize();
    return () => window.removeEventListener("resize", handleSize);
  }, []);

  useEffect(() => {
    if (windowSize.width <= 769) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, [windowSize]);

  return (
    <BrowserRouter>
      <div className=" dark:bg-black dark:text-[#dddee3] ">
        <Routes>
          <Route path="/" element={<Home isMobile={isMobile} />} />
          <Route path="/home" element={<Home isMobile={isMobile} />} />
          <Route path="/auth" element={<Auth isMobile={isMobile} />} />
  <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
