import React from "react";
import useAuth from "./UserAuth";

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);

  return <div></div>;
};

export default Dashboard;
