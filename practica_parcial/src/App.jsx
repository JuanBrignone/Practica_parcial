import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Details from "./Pages/Details/Details";
import AddGame from "./Pages/AddGame/AddGame";
import "./App.css";

function App() {
  return (
    <div className="home-page">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/addGame" element={<AddGame />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
