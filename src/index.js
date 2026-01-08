import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "leaflet/dist/leaflet.css";
import "./leafletFix";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
