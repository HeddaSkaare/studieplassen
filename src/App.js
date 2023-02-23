import "leaflet/dist/leaflet.css";
import React from "react";
import "./App.css";
import Map from "./components/map";
import NavBar from "./components/navBar";
import SideBar from "./components/sideBar";
import "./css/map.css";

function App() {
    return (
        <div id="app">
            <NavBar></NavBar>
            <SideBar></SideBar>
            <Map></Map>
        </div>
    );
}
export default App;
