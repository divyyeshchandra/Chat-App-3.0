"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  checkIfWalletConnected,
  connectWallet,
  connectingWithcontract,
} from "../Utils/apiFeature";

export const ChatAppContext = React.createContext();

export const ChatAppProvider = ({ children }) => {
  const [account, setaccount] = useState("");
  const [userName, setuserName] = useState("");
  const [friendLists, setfriendLists] = useState([]);
  const [friendMsg, setfriendMsg] = useState([]);
  const [loading, setloading] = useState(false);
  const [userLists, setuserLists] = useState([]);
  const [error, setError] = useState("");
  const [currentUserName, setcurrentUserName] = useState("");
  const [currentUserAddress, setcurrentUserAddress] = useState("");

  const router = useRouter();

  const fetchData = async () => {
    try {
      const contract = await connectingWithcontract();

      const connectAccount = await connectWallet();
      setaccount(connectAccount);

      const userName = await contract.getUsername(connectAccount);
      setuserName(userName);

      const friendLists = await contract.getMyFriendList();
      setfriendLists(friendLists);

      const userList = await contract.getAllAppUser();
      setuserLists(userList);
    } catch (error) {
      setError("Please installand connect your wallet ");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const readMessage = async (friendAddress) => {
    try {
      const contract = await connectingWithcontract();
      const read = await contract.readMessage(friendAddress);
      setfriendMsg(read);
    } catch (error) {
      setError("Currently you have no message");
    }
  };

  const createAccount = async ({ name, accountAddress }) => {
    try {
      if (name || accountAddress)
        return setError("Name and Account address, cannot be emoty");
      const contract = await connectingWithcontract();
      const getCreatedUser = await contract.creatAccount(name);
      setloading(true);
      await getCreatedUser.wait();
      setloading(false);
      window.location.reload();
    } catch (error) {
      setError("Error while creating your account please reload browser");
    }
  };

  const addFriend = async ({ name, accountAddress }) => {
    try {
      if (name || accountAddress) return setError("Please provide");
      const contract = await connectingWithcontract();
      const addMyFriend = await contract.addFriend(accountAddress, name);
      setloading(true);
      await addMyFriend.wait();
      setloading(false);
      router.push("/");
      window.location.reload();
    } catch (error) {
      setError("Something went wrong while adding friends,try again");
    }
  };

  const sendMEssage = async ({ msg, address }) => {
    try {
      if (msg || address) return setError("Please type your message");
      const contract = await connectingWithcontract();
      const addMessage = await contract.sendMEssage(address, msg);
      setloading(true);
      await addMessage.wait();
      setloading(false);
      window.location.reload();
    } catch (error) {
      setError("Please reload and try again");
    }
  };

  const readUser = async (userAddress) => {
    const contract = await connectingWithcontract();
    const userName = await contract.getUsername(userAddress);
    setcurrentUserName(userName);
    setcurrentUserAddress(userAddress);
  };

  return (
    <ChatAppContext.Provider
      value={{
        readMessage,
        createAccount,
        addFriend,
        sendMEssage,
        readUser,
        account,
        userName,
        friendLists,
        friendMsg,
        userLists,
        loading,
        error,
        currentUserName,
        currentUserAddress,
      }}
    >
      {children}
    </ChatAppContext.Provider>
  );
};
