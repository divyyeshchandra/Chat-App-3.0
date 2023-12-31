"use client";
import React, { useContext } from "react";
import { UserCard } from "../../../Components/index";
import Style from "./alluser.module.css";
import { ChatAppContext } from "../../../Context/ChatAppContext";
import { NavBar } from "../../../Components/index";

const alluser = () => {
  const { userLists, addFriends } = useContext(ChatAppContext);
  return (
    <div>
      <NavBar />
      <div className={Style.alluser_info}>
        <h1>Find your friends</h1>
      </div>
      <div className={Style.alluser}>
        {userLists.map((el, i) => (
          <UserCard key={i + 1} el={el} i={i} addFriends={addFriends} />
        ))}
      </div>
    </div>
  );
};

export default alluser;
