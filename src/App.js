import "leaflet/dist/leaflet.css";
import React from "react";
import "./App.css";
import Map from "./components/map";
import NavBar from "./components/navBar";
import Results from "./components/results";
import "./css/map.css";

function App() {
    return (
        <div id="app">
            <NavBar></NavBar>
            <Results></Results>
            <Map></Map>
        </div>
    );
}
export default App;
