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

    const po = []
    const res1 = pois.filter((element) =>
        places.find((obj) => obj[0] === element[0])
    );
    console.log("filtery", res1);
    // vurderinger.data.forEach((e)=>{
    //     console.log()
    //     const poID = e.poiId;
    //     var navn = undefined
    //     var bygningnavn = undefined
    //     var kort = undefined
    //     points.points.forEach((poi)=>{
    //         if(poi.poiId===poID)
    //         {navn = poi.mapText
    //         bygningnavn = poi.buildingName}})

    //     const vur = e.Vurdering;
    //     const stoy = e.StoyNiva;
    //     if(e.Korttilgan){
    //         kort="Må ha korttilgang"
    //     } else{
    //         kort="Trenger ikke korttilgang"
    //     }
    //     const cap = e.kapasitet;
    //     const avst= e.Avstand;
    //     pois.push({poID,navn,bygningnavn,vur,stoy,kort,cap,avst})})

    function handleClick(poi) {
        clicked(poi);
    }
    //console.log(pois)
    //punktId = point[i][0], cordinater = [point[i][2],point[i][1]], floor = point[i][3], building = point[i][4], name = point[i][5]
    //stoyNivaa = point[i][6], Vurdering= point[i][7], Korttilgang = point[i][8], kapasitet =point[i][9]
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
                                                <p> Avstand: {avstand} m</p>
                                                <p> Match: {snitt}</p>
                                            </div>
                                            <div id="right">
                                                <p> Støynivå: {item[6]}</p>
                                                <p> Avstand: {avstand} m</p>
                                                <p> Match: {snitt}</p>
                                            </div>
                                        </div>
                                        <p id="five">
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
                                        </div>
                                    </div>
                                    <p id="five">
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
