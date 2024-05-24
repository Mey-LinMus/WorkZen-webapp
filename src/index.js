import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { SelectionProvider } from "../src/Components/Contexts/SelectionContext.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <SelectionProvider>
    <App />
  </SelectionProvider>,
  document.getElementById("root")
);
