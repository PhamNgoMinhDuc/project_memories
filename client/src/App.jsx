import React, { useEffect, useState } from "react";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Home from "./components/Home/home";
import Auth from "./components/Auth/auth";
import PostDetails from "./components/PostDetails/postDetails";
import NotFound from "./components/NotFound/notFound";

const App = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  const [isMobile, setMobile] = useState(false);
  const user = JSON.parse(localStorage.getItem("profile"));

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
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home isMobile={isMobile} />} />
          <Route path="/home/search" element={<Home isMobile={isMobile} />} />
          <Route path="/home/:id" element={<PostDetails isMobile={isMobile} />} />
          <Route path="/auth" element={!user ? <Auth isMobile={isMobile} /> : <Navigate to="/home" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
