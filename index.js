import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProviderCustom } from "./context/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <ThemeProviderCustom>
      <>
        <App />
        <Toaster position="top-center" />
      </>
    </ThemeProviderCustom>
  </BrowserRouter>
);
