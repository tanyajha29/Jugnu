import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { EmotionProvider } from "./context/EmotionContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <EmotionProvider>
      <App />
    </EmotionProvider>
  </React.StrictMode>
);
