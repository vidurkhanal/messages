import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVertRounded,
  SearchOutlined,
  Send,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import styles from "./chat.module.css";
import cx from "classnames";
import { useParams } from "react-router-dom";
import db from "../firebase";
import { useStateValue } from "../StateProvider";
import firebase from "firebase";

function Chat({ empty }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [roomName, setRoomName] = useState("");
  const [{ user }, dispatch] = useStateValue();
  const { roomID } = useParams();
  useEffect(() => {
    if (roomID) {
      db.collection("chatrooms")
        .doc(roomID)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));
      db.collection("chatrooms")
        .doc(roomID)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomID]);

  if (empty) {
    return <h1>SELECT A CHAT TO CONTINUE</h1>;
  }

  const sendMsg = (e) => {
    e.preventDefault();
    if (message.length !== 0) {
      db.collection("chatrooms").doc(roomID).collection("messages").add({
        message,
        name: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setMessage(" ");
    }
  };

  return (
    <div className={styles.chat}>
      <div className={styles.header}>
        <Avatar
          src={` https://api.adorable.io/avatars/285/${roomName}
        )}@adorable.io.png`}
        />
        <div className={styles.headerMid}>
          <h3>{roomName}</h3>
          {messages.length !== 0 && (
            <p>
              Last Active At{" "}
              {new Date(
                messages[messages.length - 1]?.timestamp?.toDate()
              ).toUTCString()}{" "}
            </p>
          )}
        </div>
        <div className={styles.headerRight}>
          <IconButton>
            <SearchOutlined className={styles.headerIcon} />
          </IconButton>
          <IconButton>
            <AttachFile className={styles.headerIcon} />
          </IconButton>
          <IconButton>
            <MoreVertRounded className={styles.headerIcon} />
          </IconButton>
        </div>
      </div>
      <div className={styles.body}>
        {messages.map((msg) => (
          <p
            className={cx(
              styles.message,
              msg.name === user.displayName && styles._sender
            )}
          >
            <span className={styles.sender}>{msg.name}</span>
            {msg.message}
            <span className={styles.time}>
              {new Date(msg.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className={styles.footer}>
        <InsertEmoticon className={styles.footerIcon} />

        <form onSubmit={sendMsg}>
          <input
            type="text"
            placeholder="Send A Message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button type="submit">
            <Send className={styles.footerIcon} />
          </button>
        </form>
        <Mic className={styles.footerIcon} />
      </div>
    </div>
  );
}

export default Chat;
