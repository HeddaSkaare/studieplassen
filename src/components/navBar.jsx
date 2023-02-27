import "leaflet/dist/leaflet.css";

import React from 'react';



function NavBar(){
    return(
        <div className ="navBar">
            <a id="filterSite" href="filterSite">Finn studieplass</a>
             <div class="topnav-centered">
                 <a id="home" href="/">Studieplassen</a>
            </div>
            <a id="logIn"href="logIn">Logg inn</a>
        </div>
    )
};
export default NavBar;