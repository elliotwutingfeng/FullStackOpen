import React from "react";
const Notification = ({ message }) => {
  const successStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  const errorStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  if (message[0] === null) {
    return null;
  } else if (message[1] === true) {
    return <div style={successStyle}>{message}</div>;
  } else {
    return <div style={errorStyle}>{message}</div>;
  }
};
export default Notification;
