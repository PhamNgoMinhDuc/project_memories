/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { AiFillCloseCircle } from "react-icons/ai";

import { getPostsBySearch } from "../../redux/actions/postsAction";
const form = () => {
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  const { t } = useTranslation();
  const dipatch = useDispatch();
  const navigation = useNavigate();

  const searchPost = () => {
    if (search.trim() || tags) {
      dipatch(getPostsBySearch({ search, tags: tags.join(",") }));
      navigation(`/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`);
    } else {
      navigation("/");
    }
  };

  const removeTags = (indexToRemove) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };
  const addTags = (event) => {
    if (event.target.value !== "") {
      setTags([...tags, event.target.value]);
      event.target.value = "";
    }
  };

  return (
    <div className=" h-auto mb-5 form ">
      <h3 className=" text-center font-bold">{t("form.searchPost")}</h3>

      <input
        type="text"
        placeholder={t("form.searchPost")}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyUp={(event) => (event.key === "Enter" ? searchPost() : null)}
        className="form-input"
      ></input>
      <div className="form-input flex flex-wrap">
        <ul className=" w-full flex gap-1 flex-wrap ">
          {tags.map((tag, index) => (
            <>
              <li key={index} className=" text-sm px-1 bg-blue-600 text-white border rounded-[10px] flex flex-row justify-center items-center gap-1">
                <span>{tag}</span>
                <AiFillCloseCircle className="cursor-pointer" onClick={() => removeTags(index)} />
              </li>
            </>
          ))}
        </ul>
        <input
          type="text"
          onKeyUp={(event) => (event.key === "Enter" ? addTags(event) : null)}
          placeholder={t("form.pressSpace")}
          className="w-full text-sm bg-transparent outline-none placeholder:text-black dark:placeholder:text-[#e4e6eb]"
        ></input>
      </div>
      <div>
        <button type="submit" onClick={searchPost} className=" bg-blue-600 btn mt-2">
          {t("btn.search")}
        </button>
      </div>
    </div>
  );
};

export default form;
