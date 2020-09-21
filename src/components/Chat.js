import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  MoreVertRounded,
  SearchOutlined,
} from "@material-ui/icons";
import React from "react";
import styles from "./chat.module.css";

function Chat() {
  return (
    <div className={styles.chat}>
      <div className={styles.header}>
        <Avatar
          src={`https://avatars.dicebear.com/api/human/${Math.floor(
            Math.random() * 5000
          )}.svg`}
        />
        <div className={styles.headerMid}>
          <h3>Room Name</h3>
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
      <div className={styles.body}></div>
      <div className={styles.footer}></div>
    </div>
  );
}

export default Chat;
