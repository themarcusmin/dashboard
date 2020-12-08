import React, { useState, useEffect } from "react";
import { render } from "react-dom";
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

render(<App />, document.getElementById("root"));
