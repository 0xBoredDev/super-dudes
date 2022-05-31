import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import moment from "moment-timezone";

function Timer() {
  var newYork = moment.tz("2022-05-31T19:00:00", "America/New_York");
  const Completed = () => <h1 className="title2">Public mint is now live!</h1>;
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Completed />;
    } else {
      return (
        <div>
          <h1 className="title2">Presale mint is now live!</h1>
          <span className="text">Public mint opens in </span> <br />
          <span className="timer">
            {hours}:{minutes}:{seconds}
          </span>
        </div>
      );
    }
  };
  return (
    <div>
      <Countdown date={newYork} renderer={renderer}></Countdown>
    </div>
  );
}

export default Timer;
