import { useState, useEffect } from "react";

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!code) return;

    fetch("https://musicserver-iltx.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to log in");
        }
        return res.json();
      })
      .then((data) => {
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        setExpiresIn(data.expiresIn);
        setError(null);
        window.history.pushState({}, null, "/");
      })
      .catch((err) => {
        console.error("Error during login:", err);
        setError("Failed to log in");
      });
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;

    const interval = setInterval(() => {
      fetch("https://musicserver-iltx.onrender.com/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to refresh token");
          }
          return res.json();
        })
        .then((data) => {
          setAccessToken(data.accessToken);
          setExpiresIn(data.expiresIn);
          setError(null);
        })
        .catch((err) => {
          console.error("Error refreshing token:", err);
          setError("Failed to refresh token");
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return { accessToken, error };
}
