//SPDX-License-Identifier: MIT

pragma solidity >=0.7.0<0.9.0;

 contract ChatApp{
    //USER STRUCT

    struct user{
        string name;
        friend[] friendList;
    }

    struct friend{
        address pubKey;
        string name;
    }

    struct message{
        address sender;
        uint256 timestamp;
        string msg;
    }

    struct allUserStruct{
        string name;
        address accountAddress;
    }

    allUserStruct[] getAllUsers;

    mapping(address=>user) userList;
    mapping(bytes32=>message[]) allMessages;

    //CHECK USER EXIST

    function checkUserExist(address pubKey) public view returns(bool){
        return bytes(userList[pubKey].name).length>0;
    }

    //CREATE ACCOUNT

     function createAccount(string calldata name) external{
        require(checkUserExist(msg.sender)==false,"User already exists");
        require(bytes(name).length>0,"Username cannot be empty");
        userList[msg.sender].name=name;
        getAllUsers.push(allUserStruct(name,msg.sender));
     }

     //GET USERNAME
    function getUsername(address pubKey) external view returns(string memory){
        require(checkUserExist(pubKey),"User is not reigtered");
        return userList[pubKey].name;
    }

    //ADD FRIENDS

    function addFriend(address friend_key,string calldata name) external{
        require(checkUserExist(msg.sender),"Create an account first");
        require(checkUserExist(friend_key),"User is not registered");
        require(msg.sender!=friend_key,"Users cannot add themseleves as friends");
        require(checkAlreadyFriend(msg.sender,friend_key)==false,"These users are already friends");
        _addFriend(msg.sender,friend_key,name);
        _addFriend(friend_key,msg.sender,userList[msg.sender].name);
    }

    function checkAlreadyFriend(address pubKey1,address pubKey2) internal view returns(bool){
        if(userList[pubKey1].friendList.length>userList[pubKey2].friendList.length){
            address tmp=pubKey1;
            pubKey1=pubKey2;
            pubKey2=tmp;
        }
        for(uint256 i=0;i<userList[pubKey1].friendList.length;i++){
            if(userList[pubKey1].friendList[i].pubKey==pubKey2) return true;
        }
        return false;
    }

    function _addFriend(address me,address friend_key,string memory name) internal{
        friend memory newFriend=friend(friend_key,name);
        userList[me].friendList.push(newFriend);
    }

    //GET FIRENDS

    function getMyFriendList() external view returns(friend[] memory){
        return userList[msg.sender].friendList;
    }

    //GET CHAT CODE
    function _getChatCode(address pubKey1,address pubKey2) internal pure returns(bytes32){
        if(pubKey1<pubKey2){
            return keccak256(abi.encodePacked(pubKey1,pubKey2));
        }else return keccak256(abi.encodePacked(pubKey2,pubKey1));
    }

    //SEND MESSAGE

    function sendMessage(address friend_key,string calldata _msg) external{
        require(checkUserExist(msg.sender),"Create an account first");
        require(checkUserExist(friend_key),"User is not registered");
        require(checkAlreadyFriend(msg.sender, friend_key),"You are not friend with the given user");
        bytes32 chatCode=_getChatCode(msg.sender, friend_key);
        message memory newMsg=message(msg.sender,block.timestamp,_msg);
        allMessages[chatCode].push(newMsg);
    }

    //READ MESSGAE
    function readMessage(address friend_key) external view returns(message[] memory){
        bytes32 chatCode=_getChatCode(msg.sender, friend_key);
        return allMessages[chatCode];
    }

    function getAllAppUser() public view returns(allUserStruct[] memory){
        return getAllUsers;
    }
 }