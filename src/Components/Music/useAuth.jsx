import { useState, useEffect } from "react";
import axios from "axios";

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    // Check if there is an access token in local storage
    const localAccessToken = localStorage.getItem("accessToken");
    if (localAccessToken) {
      setAccessToken(localAccessToken);
      return;
    }

    axios
      .post("http://localhost:8888/login", {
        code,
      })
      .then((res) => {
        const { accessToken, refreshToken, expiresIn } = res.data;
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setExpiresIn(expiresIn);
        // Store the access token in local storage
        localStorage.setItem("accessToken", accessToken);
        window.history.pushState({}, null, "/");
      })
      .catch(() => {
        // Handle login error
      });
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post("http://localhost:8888/refresh", {
          refreshToken,
        })
        .then((res) => {
          const { accessToken, expiresIn } = res.data;
          setAccessToken(accessToken);
          setExpiresIn(expiresIn);
          // Update the access token in local storage
          localStorage.setItem("accessToken", accessToken);
        })
        .catch(() => {
          window.location = "/";
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
}
