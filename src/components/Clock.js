import React, { useState, useEffect, useRef } from "react";

const formatter = (n) => {
  return n < 10 ? "0" + n : n;
};

const Clock = () => {
  let currentHour = new Date().getHours() % 12;
  let currentMinute = new Date().getMinutes() % 60;
  let currentSecond = new Date().getSeconds() % 60;
  const currentTimeFormat = new Date().toLocaleTimeString().slice(-2);

  const [hour, setHour] = useState(currentHour);
  const [minute, setMinute] = useState(currentMinute);
  const [second, setSecond] = useState(currentSecond);
  const [hourReset, setHourReset] = useState(false);
  const date = new Date().toDateString();

  const secondRef = useRef();
  const minuteRef = useRef();
  const hourResetRef = useRef();

  secondRef.current = second;
  minuteRef.current = minute;
  hourResetRef.current = hourReset;

  /* eslint-disable no-unused-vars */
  useEffect(() => {
    const interval = setInterval(() => {
      setSecond((second) => (second + 1) % 60);
      // minute + 1 when second reaches 00
      if (!secondRef.current) {
        setMinute((minute) => (minute + 1) % 60);
        setHourReset((hourReset) => true);
      }
      // hour + 1 when minute reaches 00 and hourReset is true
      if (!minuteRef.current && hourResetRef.current) {
        setHour((hour) => (hour + 1) % 12);
        setHourReset((hourReset) => false);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  /* eslint-enable no-unused-vars */

  return (
    <div>
      <h1 className="clock f-subheadline lh-title">
        {formatter(hour)} : {formatter(minute)} : {formatter(second)}{" "}
        {currentTimeFormat}
      </h1>
      <h3 className="dateTime f-subheadline lh-solid">{date}</h3>
    </div>
  );
};

export default Clock;
