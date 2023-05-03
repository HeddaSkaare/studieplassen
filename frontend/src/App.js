import "leaflet/dist/leaflet.css";
import React from "react";
import "./App.css";
import Map from "./components/map";
import NavBar from "./components/navBar";
import Alert from "./components/alert";
import "./css/map.css";
import "./css/page.css";
import "./css/navBar.css";
import "./css/addPlace.css";

function App() {
    return (
        <div id="app">
           

            <NavBar></NavBar>
            <Map></Map>
            <Alert></Alert>
        </div>
    );
}
export default App;
