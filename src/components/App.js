import React from "react";
import Clock from "./Clock";
import Todo from "./Todo";
import PhotoAPI from "../api/PhotoAPI";

import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";

const App = () => {
  return (
    <div className="bg2">
      <Clock />
      <Todo />
      <PhotoAPI />
      <NotificationContainer />
    </div>
  );
};

export default App;
