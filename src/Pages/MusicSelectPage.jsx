import React from "react";
import Login from "../Components/Music/Login";
import Dashboard from "../Components/Music/Dashboard";

const code = new URLSearchParams(window.location.search).get("code");

const MusicSelectPage = () => {
  return code ? <Dashboard code={code} /> : <Login />;
};

export default MusicSelectPage;
