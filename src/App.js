
import React from 'react';
import './App.css';
import Chat from "./components/Chat";
import SideBar from "./components/SideBar";

function App() {
  return (
    <div className="app">
      <main>
        <SideBar />
        <Chat />
      </main>
    </div>
  );
}

export default App;
