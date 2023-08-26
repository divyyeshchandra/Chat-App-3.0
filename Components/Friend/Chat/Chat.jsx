"use Client";
import React, { useContext, useEffect, useState } from "react";
import images from "../../../assets";
import { Error } from "../../index";
import Style from "./Chat.module.css";
import { ChatAppContext } from "../../../Context/ChatAppContext";
import { convertTime } from "../../../Utils/apiFeature";
import { Loader } from "../../index";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { ST } from "next/dist/shared/lib/utils";
const Chat = ({
  functionName,
  readMessage,
  friendMsg,
  readUser,
  account,
  userName,
  Loading,
  currentUserName,
  currentUserAddress,
}) => {
  const { friendLists } = useContext(ChatAppContext);
  const [message, setmessage] = useState("");
  const [chatData, setchatData] = useState({
    name: "",
    address: "",
  });
  const params = useSearchParams();
  useEffect(() => {
    if (params.get("name") == null && params.get("address") == null) return;
    setchatData({
      name: params.get("name"),
      address: params.get("address"),
    });
    readMessage(params.get("address"));
    readUser(params.get("address"));
  }, []);
  const friendListSize = friendLists.length;
  return (
    <div>
      {friendListSize ? (
        <div className={Style.Chat}>
          {currentUserName && currentUserAddress ? (
            <div className={Style.Chat_user_info}>
              <Image
                src={images.accountName}
                alt="image"
                width={70}
                height={70}
              />
              <div className={Style.Chat_user_info_box}>
                <h4>{currentUserName}</h4>
                <p className={Style.show}>{currentUserAddress}</p>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className={Style.Chat_box_box}>
            <div className={Style.Chat_box}>
              <div className={Style.Chat_box_left}>
                {friendMsg.map((el, i) => (
                  <div key={i}>
                    {el.sender == chatData.address ? (
                      <div className={Style.Chat_box_left_title}>
                        <Image
                          src={images.accountName}
                          alt="image"
                          width={50}
                          height={50}
                        />
                        <span>
                          {chatData.name}
                          {""}
                          <small>Time:{convertTime(el.timestamp)}</small>
                        </span>
                      </div>
                    ) : (
                      <div className={Style.Chat_box_left_title}>
                        <Image
                          src={images.accountName}
                          alt="image"
                          width={50}
                          height={50}
                        />
                        <span>
                          {userName}
                          {""}
                          <small>Time:{convertTime(el.timestamp)}</small>
                        </span>
                      </div>
                    )}
                    <p key={i + 1}>
                      {el.msg}
                      {""}
                      {""}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {currentUserAddress && currentUserName ? (
              <div className={Style.Chat_box_send}>
                <div className={Style.Chat_box_send_img}>
                  <Image
                    src={images.smile}
                    alt="smile"
                    width={50}
                    height={50}
                  />
                  <input
                    type="text"
                    placeholder="type your message"
                    onChange={(e) => setmessage(e.target.value)}
                  />
                  <Image src={images.file} alt="file" width={50} height={50} />
                  {Loading == true ? (
                    <Loader />
                  ) : (
                    <Image
                      src={images.send}
                      alt="file"
                      width={50}
                      height={50}
                      onClick={() =>
                        functionName({
                          msg: message,
                          address: chatData.address,
                        })
                      }
                    />
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Chat;
