import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Login from "./login.jsx";
import Home from "./Home.jsx";
import FormInsert from "./FormInsert.jsx";
import Account from "./Account.jsx"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/App" element={<App />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/account" element={<Account/>}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
