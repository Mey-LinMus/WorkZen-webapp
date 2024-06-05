import React, { useEffect, useState } from "react";
import axios from "axios";

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();
  const [requestCount, setRequestCount] = useState(0); // Nieuwe staat voor het bijhouden van het aantal verzoeken

  useEffect(() => {
    axios
      .post("https://musicserver-iltx.onrender.com/login", { code })
      .then((res) => {
        console.log("Login response:", res.data);
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, null, "/");
        setRequestCount((prevCount) => prevCount + 1); // Verhoog het aantal verzoeken met 1
      })
      .catch((err) => {
        console.error("Error during login:", err);
        window.location = "/";
      });
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post("https://musicserver-iltx.onrender.com/refresh", { refreshToken })
        .then((res) => {
          console.log("Refresh response:", res.data);
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
          setRequestCount((prevCount) => prevCount + 1); // Verhoog het aantal verzoeken met 1
        })
        .catch((err) => {
          console.error("Error refreshing token:", err);
          window.location = "/";
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  console.log("Total requests:", requestCount); // Log het totale aantal verzoeken

  return accessToken;
}
