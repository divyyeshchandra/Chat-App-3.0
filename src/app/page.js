"use client";
import React, { useContext } from "react";
import { ChatAppContext } from "../../Context/ChatAppContext";
import { Filter, Friend } from "../../Components/index";
import { NavBar } from "../../Components/index";
const page = () => {
  const {} = useContext(ChatAppContext);
  return (
    <>
      <NavBar />
      <Filter />
      <Friend />
    </>
  );
};

export default page;
