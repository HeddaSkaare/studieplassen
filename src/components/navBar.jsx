import "leaflet/dist/leaflet.css";

import React from 'react';



function NavBar(){
    return(
        <div class ="navBar">
            <a id="filterSite" href="filterSite">Finn studieplass</a>
            <a id="home" href="/">Studieplassen</a>
            <a id="logIn"href="logIn">Logg inn</a>
        </div>
    )
};
export default NavBar;