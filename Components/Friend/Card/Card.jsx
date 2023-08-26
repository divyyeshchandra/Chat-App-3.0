"use client";
import React from "react";
import Image from "next/image";

import Style from "./Card.module.css";
import images from "../../../assets";
import Link from "next/link";

const Card = ({ el, i, readMessage, readUser }) => {
  return (
    <Link
      href={{
        pathname: "/",
        query: { name: `${el.name}`, address: `${el.pubKey}` },
      }}
    >
      <div
        className={Style.Card}
        onClick={() => (readMessage(el.pubKey), readUser(el.pubKey))}
      >
        <div className={Style.Card_box}>
          <div className={Style.Card_box_left}>
            <Image
              src={images.accountName}
              alt="username"
              width={50}
              height={50}
              className={Style.Card_box_left_img}
            />
          </div>
          <div className={Style.Card_box_right}>
            <div className={Style.Card_box_right_middle}>
              <h4>{el.name}</h4>
              <small>{el.pubKey.slice(21)}...</small>
            </div>
            <div className={Style.Card_box_right_end}>
              <small>{i + 1}</small>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
