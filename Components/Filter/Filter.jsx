import React, { useContext, useState } from "react";
import Image from "next/image";
import Style from "./Filter.module.css";
import images from "../../assets";
import { ChatAppContext } from "../../Context/ChatAppContext";
import { Model } from "../index";
import Link from "next/link";
import Alluser from "@/app/alluser/page";

const Filter = () => {
  const { account, addFriends } = useContext(ChatAppContext);
  const [addFriend, setaddFriend] = useState(false);
  return (
    <div className={Style.Filter}>
      <div className={Style.Filter_box}>
        <div className={Style.Filter_box_left}>
          <div className={Style.Filter_box_left_search}>
            <Image src={images.search} alt="image" width={20} height={20} />
            <input type="text" placeholder="search..." />
          </div>
        </div>
        <div className={Style.Filter_box_right}>
          <button>
            <Image src={images.clear} alt="clear" width={20} height={20} />
            CLEAR CHAT
          </button>
          <button onClick={() => setaddFriend(true)}>
            <Image src={images.user} alt="clear" width={20} height={20} />
            ADD FRIEND
          </button>
        </div>
      </div>
      {/* MODAL COMPONENT */}
      {addFriend && (
        <div className={Style.Filter_model}>
          <Alluser />
        </div>
      )}
    </div>
  );
};

export default Filter;
