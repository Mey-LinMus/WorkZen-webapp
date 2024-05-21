import Login from "../src/Components/Music/Login";
import Dashboard from "../src/Components/Music/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  return code ? <Dashboard code={code} /> : <Login />;
}

export default App;
