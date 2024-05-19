import React from "react";

const URI = "http://localhost:3000/";
const client_id = "1f4f7e164fe945998e2b5904bd676792";
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

const Login = () => {
  return <a href={AUTH_URL}>Login With Spotify</a>;
};

export default Login;
