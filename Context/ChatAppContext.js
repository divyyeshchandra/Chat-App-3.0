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
      console.log(error);
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
      console.log("Please reload and try again");
    }
  };

  const createAccount = async ({ name, accountAddress }) => {
    try {
      console.log(name, accountAddress);
      // if (name || accountAddress)
      //   return setError("Name and Account address, cannot be emoty");
      const contract = await connectingWithcontract();
      const getCreatedUser = await contract.createAccount(name);
      setloading(true);
      await getCreatedUser.wait();
      setloading(false);
      window.location.reload();
    } catch (error) {
      console.log("Please reload and try again");
    }
  };

  const addFriends = async ({ name, accountAddress }) => {
    try {
      console.log(name, accountAddress);
      // if (name || accountAddress) return setError("Please provide");
      const contract = await connectingWithcontract();
      const addMyFriend = await contract.addFriend(accountAddress, name);
      setloading(true);
      await addMyFriend.wait();
      setloading(false);
      router.push("/");
      window.location.reload();
    } catch (error) {
      console.log("Please reload and try again");
    }
  };

  const sendMessage = async ({ msg, address }) => {
    try {
      console.log(msg, address);
      // if (msg || address) return setError("Please type your message");
      const contract = await connectingWithcontract();
      const addMessage = await contract.sendMessage(address, msg);
      setloading(true);
      await addMessage.wait();
      setloading(false);
      window.location.reload();
    } catch (error) {
      console.log("Please reload and try again");
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
        addFriends,
        checkIfWalletConnected,
        sendMessage,
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
