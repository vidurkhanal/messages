import React from "react";
import "./App.css";
import Chat from "./components/Chat";
import SideBar from "./components/SideBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();

  if (!user) {
    return <Login />;
  }
  return (
    <div className="app">
      <div className="purpleBox"></div>
      <main>
        <Router>
          <SideBar />

          <Switch>
            <Route path="/rooms/:roomID">
              <Chat />
            </Route>
            <Route path="/">
              <Chat empty />
            </Route>
          </Switch>
        </Router>
      </main>
    </div>
  );
}

export default App;
