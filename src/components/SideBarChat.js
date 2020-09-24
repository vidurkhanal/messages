import { Avatar } from "@material-ui/core";
import React from "react";
import styles from "./SidebarChat.module.css";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import db from "../firebase";

function SideBarChat({ addNewChat, data }) {
  const createChat = () => {
    const RoomName = prompt("Enter A Room Name.");
    if (RoomName) {
      // ADD TO DB....
      db.collection('chatrooms').add({
        name:RoomName,
      })
    }
  };
  return !addNewChat ? (
    <div className={styles.chat}>
      <Avatar
        src={`https://avatars.dicebear.com/api/human/${Math.floor(
          Math.random() * 5000
        )}.svg`}
      />
      <div className={styles.info}>
        <h2>{data.name}</h2>
        <p>Last Message</p>
      </div>
    </div>
  ) : (
    <div className={styles.chat} onClick={createChat}>
      <h2 className={styles.addNewChat}>
        Add New Chat <AddCircleOutlineIcon />
      </h2>
    </div>
  );
}

export default SideBarChat;
