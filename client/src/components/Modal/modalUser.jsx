/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";

import { changeInfor, changePassword } from "../../redux/actions/authAction";

const modalUser = (props) => {
  const { isShowingUser, toggleUser, isMobile } = props;
  const user = JSON.parse(localStorage.getItem("profile"));
  const [switchBtn, setSwitchBtn] = useState(true);
  const [formDataInfor, setformDataInfor] = useState({ firstName: "", lastName: "", avatar: "" });
  const [formDataPasswod, setformDataPassword] = useState({ oldPassword: "", newPassword: "" });
  const [errorInfor, setErrorInfor] = useState({ firstName: "", lastName: "", avatar: "" });
  const [errorPasswod, setErrorPasswod] = useState({ oldPassword: "", newPassword: "" });
  const dispatch = useDispatch();

  const errUpdate = useSelector((state) => state.auth.err.errUpdate);
  const errPassword = useSelector((state) => state.auth.err.errPassword);

  const handleChangeInfor = (e) => {
    setformDataInfor({ ...formDataInfor, [e.target.name]: e.target.value });
  };

  const handleChangePassword = (e) => {
    setformDataPassword({ ...formDataPasswod, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (switchBtn) {
      dispatch(changeInfor(user?.result?._id, formDataInfor));
    } else {
      dispatch(changePassword(user?.result?._id, formDataPasswod));
    }
  };

  useEffect(() => {
    setErrorInfor(errUpdate);
  }, [errUpdate]);

  useEffect(() => {
    setErrorPasswod(errPassword);
  }, [errPassword]);

  return isShowingUser ? (
    <form onSubmit={handleSubmit}>
      <div className="w-full h-screen fixed flex z-[1001] items-center justify-center ]">
        <div className=" absolute w-full h-full bg-[rgba(0,0,0,0.4)]" onClick={toggleUser}></div>
        <div className=" absolute form w-[500px] h-auto bg-white">
          <div className=" flex flex-col items-center">
            {switchBtn ? (
              <>
                <h3 className=" mt-2 text-2xl font-bold mb-2">Thay đổi thông tin</h3>
                <div className="flex gap-4 w-full">
                  <button className="text-white w-full bg-blue-500 rounded-[5px] cursor-pointer" onClick={() => setSwitchBtn(true)}>
                    Thay đổi thông tin
                  </button>
                  <button className="text-white w-full bg-blue-300 rounded-[5px] cursor-pointer" onClick={() => setSwitchBtn(false)}>
                    Thay đổi mật khẩu
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className=" mt-2 text-2xl font-bold mb-2">Thay đổi mật khẩu</h3>
                <div className="flex gap-4 w-full">
                  <button className="text-white w-full bg-blue-300 rounded-[5px] cursor-pointer" onClick={() => setSwitchBtn(true)}>
                    Thay đổi thông tin
                  </button>
                  <button className="text-white w-full bg-blue-500 rounded-[5px] cursor-pointer" onClick={() => setSwitchBtn(false)}>
                    Thay đổi mật khẩu
                  </button>
                </div>
              </>
            )}

            <div className=" float-left w-full mt-2">
              <strong>Tài khoản:</strong>
              {user?.result?.email}
            </div>
            <div className=" float-left w-full mt-2">
              <strong>Tên:</strong> {user?.result?.name}
            </div>
            {switchBtn ? (
              <div>
                <div className="flex felx-row gap-4">
                  <input
                    type="text"
                    name="firstName"
                    onChange={handleChangeInfor}
                    placeholder="FirstName"
                    className="w-full border-2 border-[rgb(200 201 203 / 50%)] h-15 mt-5 py-2 px-4 placeholder:text-black dark:bg-[#3a3b3c] dark:placeholder:text-[#e4e6eb] dark:border-black"
                  />
                  <input
                    type="text"
                    name="lastName"
                    onChange={handleChangeInfor}
                    placeholder="LastName"
                    className="w-full border-2 border-[rgb(200 201 203 / 50%)] h-15 mt-5 py-2 px-4 placeholder:text-black dark:bg-[#3a3b3c] dark:placeholder:text-[#e4e6eb] dark:border-black"
                  />
                </div>
                {errorInfor && <div className=" text-error">{errorInfor.firstName}</div>}
                {errorInfor && <div className=" text-error">{errorInfor.lastName}</div>}
                <div className="my-2">
                  <FileBase type="file" multiple={false} onDone={({ base64 }) => setformDataInfor({ ...formDataInfor, avatar: base64 })} />
                </div>
                {errorInfor && <div className="text-error">{errorInfor.avatar}</div>}
              </div>
            ) : (
              <div>
                <input
                  type="password"
                  name="oldPassword"
                  onChange={handleChangePassword}
                  placeholder="oldPassword"
                  className="w-full border-2 border-[rgb(200 201 203 / 50%)] h-15 mt-5 py-2 px-4 placeholder:text-black dark:bg-[#3a3b3c] dark:placeholder:text-[#e4e6eb] dark:border-black"
                />
                {errorPasswod && <div className=" text-error">{errorPasswod.oldPassword}</div>}
                <input
                  type="password"
                  name="newPassword"
                  onChange={handleChangePassword}
                  placeholder="newPassword"
                  className="w-full border-2 border-[rgb(200 201 203 / 50%)] h-15 mt-5 py-2 px-4 placeholder:text-black dark:bg-[#3a3b3c] dark:placeholder:text-[#e4e6eb] dark:border-black"
                />
                {errorPasswod && <div className=" text-error">{errorPasswod.newPassword}</div>}
              </div>
            )}

            <button type="submit" className="btn bg-blue-600 mt-4">
              Cập Nhập
            </button>
          </div>
        </div>
      </div>
    </form>
  ) : null;
};

export default modalUser;
