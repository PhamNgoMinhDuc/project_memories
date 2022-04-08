import React, { useState } from "react";

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  const toggle = () => {
    setIsShowing(!isShowing);
  };

  const [isShowingUser, setIsShowingUser] = useState(false);

  const toggleUser = () => {
    setIsShowingUser(!isShowingUser);
  };
  return { isShowing, toggle, isShowingUser, toggleUser };
};

export default useModal;
