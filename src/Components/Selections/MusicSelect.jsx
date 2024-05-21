import React from "react";
import Dashboard from "../Music/Dashboard";
import Login from "../Music/Login";
import "bootstrap/dist/css/bootstrap.min.css";

function MusicSelect() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  console.log("Extracted code:", code); 

  return code ? <Dashboard code={code} /> : <Login />;
}

export default MusicSelect;
