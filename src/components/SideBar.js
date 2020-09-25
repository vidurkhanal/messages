import React, { useEffect, useState } from "react";
import styles from "./sidebar.module.css";
import { Avatar, IconButton } from "@material-ui/core";
import { Chat, DonutLarge, MoreVert, SearchOutlined } from "@material-ui/icons";
import SideBarChat from "./SideBarChat";
import db from "../firebase";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";

function SideBar() {
  const [{ user }, dispatch] = useStateValue();
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    const unsubscribe = db.collection("chatrooms").onSnapshot((snapshot) => {
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div className={styles.SideBar}>
      <div className={styles.header}>
        <Avatar src={user?.user.photoURL} />
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
          <input type="text" placeholder="Search Conversations" />
        </div>
      </div>
      <div className={styles.chats}>
        <SideBarChat addNewChat />
        {rooms.map((room) => (
          <Link to={`/rooms/${room.id}`} key={room.id}>
            <SideBarChat data={room.data} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
