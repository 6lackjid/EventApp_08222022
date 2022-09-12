import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CookiesProvider } from "react-cookie";
import { Login } from "./components/Login";



const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <div>
    {/* <CookiesProvider> */}
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="account/login" element={<Login />} />
        <Route path="/account/mypage/myevents" element={<Login />} />
        <Route path="/account/register" element={<Login />} />
        <Route path="/event/create" element={<Login />} />
    {/* <App /> */}
    </Routes>
    </BrowserRouter>
  {/* </CookiesProvider> */}
  </div>
  // </React.StrictMode>
);
