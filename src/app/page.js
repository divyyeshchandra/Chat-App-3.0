"use client";
import React, { useContext } from "react";
import { ChatAppContext } from "../../Context/ChatAppContext";
import { Filter, Friend } from "../../Components/index";
const page = () => {
  const {} = useContext(ChatAppContext);
  return (
    <div>
      <Filter />
      <Friend />
    </div>
  );
};

export default page;
