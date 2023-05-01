import React, { Fragment, useState } from "react";




function Alert(){
    const [isClose, setClosed] = useState("false"); 
    const handleClose= () => {
        setClosed(!isClose);
        };
    return(
        <div className={isClose ? "fragment": "fragmentX"}>
            <button id="close" onClick={handleClose}>x</button>
            <h3>Velkommen til Studieplassen!</h3>
            <p >
                Her ser du en oversikt over lesesalene i Trondheim. 
            </p>
            <p>
                For å finne den beste studieplassene for deg, trykk på "Finn studieplass" øverst til venstre.
            </p>

        </div>
    )
    };
export default Alert;
