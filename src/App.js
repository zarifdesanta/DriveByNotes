import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import HomeTest from "./pages/HomeTest";
import Header from "./components/Header";

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" Component={Home}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
