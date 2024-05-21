import React from "react";
import { Container } from "react-bootstrap";
import Dashboard from "../src/Components/Music/Dashboard"; // Import the Dashboard component directly
import "bootstrap/dist/css/bootstrap.min.css";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  return <Dashboard code={code} />; // Render the Dashboard component directly
}

export default App;
