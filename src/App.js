import "leaflet/dist/leaflet.css";
import React from "react";
import "./App.css";
import Map from "./components/map";
import NavBar from "./components/navBar";
import "./css/map.css";
import "./css/page.css";
import "./css/navBar.css";

function App() {
    return (
        <div id="app">
            <NavBar></NavBar>
            <Map></Map>
        </div>
    );
}
export default App;
