import React, { useEffect, useState } from "react";

import NavBar from "./components/navBar/navBar";
import Form from "./components/Form/form";
import Posts from "./components/Posts/posts";

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
    console.log(windowSize);
    if (windowSize.width <= 769) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, [windowSize]);

  return (
    <div className="h-screen">
      <NavBar isMobile={isMobile} />

      {/*       <div class="grid grid-cols-4 gap-4">
        <div class="bg-red-500 col-span-1 ">01</div>
        <div class="bg-blue-500 col-span-2 ">02</div>
        <div class="bg-green-500 col-span-1 ">03</div>
        <div class="bg-yellow-500 col-span-1 ">04</div>
      </div> */}

      <div className="md:flex gap-4 px-4 mt-20">
        <Form />
        <Posts />
      </div>
    </div>
  );
};

export default App;
