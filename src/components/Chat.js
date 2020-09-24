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

function Chat({ empty }) {

  const [message, setMessage] = useState("");
  const [seed, setSeed] = useState("");
  const [roomName ,setRoomName] = useState("")
  const {roomID} = useParams()
  useEffect(()=>{
    if (roomID){
      db.collection("chatrooms").doc(roomID).onSnapshot(snapshot => 
        setRoomName(snapshot.data().name)
      )
    }
    setSeed(Math.floor(Math.random() * 5000));

  },[roomID])


  if (empty)  {
    return <h1>SELECT A CHAT TO CONTINUE</h1>;;
  }
 
  return (
    <div className={styles.chat}>
      <div className={styles.header}>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className={styles.headerMid}>
          <h3>{roomName}</h3>
          <p>Last Seen At... </p>
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
        <p className={cx(styles.message, true && styles._sender)}>
          <span className={styles.sender}>Mark Zuckerberg</span>
          Hello World
          <span className={styles.time}>3:00AM</span>
        </p>
      </div>
      <div className={styles.footer}>
        <InsertEmoticon className={styles.footerIcon} />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setMessage(" ");
          }}
        >
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
