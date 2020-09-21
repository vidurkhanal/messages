import React from "react";
import styles from "./sidebar.module.css";
import { Avatar, IconButton } from "@material-ui/core";
import { Chat, DonutLarge, MoreVert, SearchOutlined } from "@material-ui/icons";
import SideBarChat from "./SideBarChat";

function SideBar() {
  return (
    <div className={styles.SideBar}>
      <div className={styles.header}>
        <Avatar />
        <div className={styles.headerRight}>
          <IconButton>
            <DonutLarge className={styles.headerRightIcon} />
          </IconButton>
          <IconButton>
            <Chat className={styles.headerRightIcon} />
          </IconButton>

          <IconButton>
            <MoreVert className={styles.headerRightIcon} />
          </IconButton>
        </div>
      </div>
      <div className={styles.search}>
        <div className={styles.searchContainer}>
          <SearchOutlined className={styles.searchIcon} />
          <input type="text" />
        </div>
      </div>
      <div className={styles.chats}>
        <SideBarChat addNewChat />
        <SideBarChat />
        <SideBarChat />
        <SideBarChat />
        <SideBarChat />
      </div>
    </div>
  );
}

export default SideBar;
