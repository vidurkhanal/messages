import { Avatar } from "@material-ui/core";
import React from "react";
import styles from "./SidebarChat.module.css";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

function SideBarChat({ addNewChat }) {
  const createChat = () => {
    const RoomName = prompt("Enter A Room Name.");
    if (RoomName) {
      // ADD TO DB....
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
        <h2>ChatGroup Name</h2>
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
