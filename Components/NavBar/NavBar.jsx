"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Style from "./NavBar.module.css";
import { ChatAppContext } from "../../Context/ChatAppContext";
import { Model, Error } from "../index";
import images from "../../assets";
import { ST } from "next/dist/shared/lib/utils";

const NavBar = () => {
  const menuItems = [
    {
      menu: "ALL USERS",
      link: "alluser",
    },
    {
      menu: "CHAT",
      link: "/",
    },
    {
      menu: "CONTACT",
      link: "/",
    },
    {
      menu: "FAQS",
      link: "/",
    },
    {
      menu: "TERMS OF USE",
      link: "/",
    },
  ];

  const [active, setactive] = useState(2);
  const [open, setopen] = useState(false);
  const [openModel, setopenModel] = useState(false);

  const { account, userName, connectWallet, createAccount, error } =
    useContext(ChatAppContext);

  return (
    <div className={Style.NavBar}>
      <div className={Style.NavBar_box}>
        <div className={Style.NavBar_box_left}>
          <Image src={images.logo} alt="logo" width={50} height={50} />
        </div>
        <div className={Style.NavBar_box_right}>
          {/* //DESKTOP */}
          <div className={Style.NavBar_box_right_menu}>
            {menuItems.map((el, i) => (
              <div
                onClick={() => setactive(i + 1)}
                key={i + 1}
                className={`${Style.NavBar_box_right_menu_items} ${
                  active == i + 1 ? Style.active_btn : ""
                }`}
              >
                <Link
                  className={Style.NavBar_box_right_menu_items_link}
                  href={el.link}
                >
                  {el.menu}
                </Link>
              </div>
            ))}
          </div>
          {/* //MOBILE */}
          {open && (
            <div className={Style.mobile_menu}>
              {menuItems.map((el, i) => (
                <div
                  onClick={() => setactive(i + 1)}
                  key={i + 1}
                  className={`${Style.mobile_menu_items} ${
                    active == i + 1 ? Style.active_btn : ""
                  }`}
                >
                  <Link className={Style.mobile_menu_items_link} href={el.link}>
                    {el.menu}
                  </Link>
                </div>
              ))}
              <p className={Style.mobile_menu_btn}>
                <Image
                  src={images.close}
                  alt="close"
                  width={50}
                  height={50}
                  onClick={() => setopen(false)}
                />
              </p>
            </div>
          )}
          {/* CONNECT WALLET */}
          <div className={Style.NavBar_box_right_connect}>
            {account == "" ? (
              <button onClick={() => connectWallet()}>
                <span>Connect Wallet</span>
              </button>
            ) : (
              <button>
                <Image
                  src={userName ? images.accountName : images.create2}
                  alt="Account image"
                  width={20}
                  height={20}
                />

                <h3>
                  {userName || (
                    <small onClick={() => setopenModel(true)}>
                      Create account
                    </small>
                  )}
                </h3>
              </button>
            )}
          </div>
          <div
            className={Style.NavBar_box_right_open}
            onClick={() => setopen(true)}
          >
            <Image src={images.open} alt="open" width={30} height={30} />
          </div>
        </div>
      </div>
      {openModel && (
        <div className={Style.modelBox}>
          <Model
            openBox={setopenModel}
            title="WELCOME TO"
            head="CHAT BUDDY"
            info="Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type"
            smallInfo="Kindely select your name.."
            image={images.hero}
            functionName={createAccount}
            address={account}
          />
        </div>
      )}
      {error == "" ? "" : <Error error={error} />}
    </div>
  );
};

export default NavBar;
