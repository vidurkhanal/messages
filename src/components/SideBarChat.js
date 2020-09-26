import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styles from "./SidebarChat.module.css";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import db from "../firebase";

function SideBarChat({ addNewChat, data, id }) {
  const [msg, setMsg] = useState([]);
  useEffect(() => {
    if (id) {
      db.collection("chatrooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMsg(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id, setMsg]);
  const createChat = () => {
    const RoomName = prompt("Enter A Room Name.");
    if (RoomName) {
      // ADD TO DB....
      db.collection("chatrooms").add({
        name: RoomName,
      });
    }
  };

  function truncateString(str, num) {
    // If the length of str is less than or equal to num
    // just return str--don't truncate it.
    if (str.length <= num) {
      return str;
    }
    // Return str truncated with '...' concatenated to the end of str.
    return str.slice(0, num) + "...";
  }

  return !addNewChat ? (
    <div className={styles.chat}>
      <Avatar
        src={` https://api.adorable.io/avatars/285/${data.name}
        )}@adorable.io.png`}
      />
      <div className={styles.info}>
        <h2>{data.name}</h2>
        <p>
          {msg[0]?.message.length >= 80
            ? msg[0]?.message.slice(0, 20) + "..."
            : msg[0]?.message}
        </p>
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
