import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../src/App";
import AddPlace from "../src/components/addPlace";
import FilterSite from "../src/components/filterSite";
import Login from "../src/components/loginPage";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Results from "./components/results";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<Login />} />
                <Route path="/addplace" element={<AddPlace />} />
                <Route path="/filterSite" element={<FilterSite />} />
                <Route path="/result" element={<Results />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
