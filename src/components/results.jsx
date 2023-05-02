import { makeVar, useReactiveVar } from "@apollo/client";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MapResult from "./mapResult";
import { clickedPoint } from "./markersResult";
import NavBar from "./navBar";


export let clicked = makeVar("");
function Results() {
    const [hasFetchedData, setHasFetchedData] = useState(false);
    const [pois, setPois] = useState([]);
    const location = useLocation();
    const { places } = location.state;
    useEffect(() => {
        console.log("places", places);
    }, [places]);

    useEffect(() => {
        if (!hasFetchedData) {
            fetch("/api/Vurderinger")
                .then((response) => response.json())
                .then((data) => {
                    setPois(data);
                    setHasFetchedData(true);
                });
        }
    }, [hasFetchedData]);
    let clicked2 = useReactiveVar(clickedPoint);

    const res1 = pois.filter((element) =>
        places.find((obj) => obj[0] === element[0])
    );
    console.log("filtery", res1);
  


    function handleClick(poi) {
        clicked(poi);
    }

    return (
        <div>
            <NavBar></NavBar>
            <div className="container">
                <div className="sideBar">
                    <h3>Dine beste studieplasser</h3>
                    <div className="sideBar2">
                        {res1.map((item) => {
                            const po = places.find(el => el[0] === item[0])
                            const avstand = po[2]
                            const snitt = po[1]
                            console.log(avstand)
                            if (clicked2 == item[0]) {
                                return (
                                    <div
                                        className="result1"
                                        onClick={() => handleClick(item[0])}
                                    >
                                        <p id="first">{item[5]}</p>
                                        <p id="second">{item[4]}</p>
                                        <div className="boxContainer">
                                            <div id="left">
                                                <p> Vurdering: {item[7]}</p>
                                                <p> Kapasitet: {item[9]}</p>
                                            </div>
                                            <div id="right">
                                                <p> Støynivå: {item[6]}</p>
                                                <p> Avstand: {Math.round(avstand)} m</p>
                                          
                                            </div>
                                        </div>
                                        <p id="five">
                                        <p> Match: {snitt.toFixed(2)}</p>
                                            {" "}
                                            {item[8]
                                                ? "Må ha korttilgang"
                                                : "Trenger ikke korttilgang"}
                                        </p>
                                    </div>
                                );
                            }
                            return (
                                <div
                                    className="result1"
                                    onClick={() => handleClick(item[0])}
                                >
                                    <p id="first">{item[5]}</p>
                                    <p id="second">{item[4]}</p>
                                    <div className="boxContainer">
                                        <div id="left">
                                            <p> Vurdering: {item[7]}</p>
                                            <p> Kapasitet: {item[9]}</p>
                                        </div>
                                        <div id="right">
                                            <p> Støynivå: {item[6]}</p>
                                            <p> Avstand: {Math.round(avstand)} m</p>
                                        </div>
                                    </div>
                                    <p id="five">
                                    <p> Match: {snitt.toFixed(2)}</p>
                                        {" "}
                                        {item[8]
                                            ? "Trenger ikke korttilgang"
                                            : "Må ha korttilgang"}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div>
                    <MapResult></MapResult>
                </div>
            </div>
        </div>
    );
}
export default Results;
