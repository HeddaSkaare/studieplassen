import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/filterSite.css";
import NavBar from "./navBar";

export default function FilterSite() {
    const [stoy, setStoy] = useState(3);
    const [checkStoy, setCheckStoy] = useState(false);
    const [storrelse, setStorrelse] = useState(50);
    const [checkStorrelse, setCheckStorrelse] = useState(false);
    const [vurdering, setVurdering] = useState(3);
    const [checkVurdering, setCheckVurdering] = useState(false);
    const [nerhet, setNerhet] = useState(3);
    const [checkNerhet, setCheckNerhet] = useState(false);
    const navigate = useNavigate();
    const [hasFetchedData, setHasFetchedData] = useState(false);
    const [pois, setPois] = useState([]);
    const [brukerPosisjon, setBrukerPosisjon] = useState([]);
    const [bestPlaces, setBestPlaces] = useState([]);
    const [korttilgang, setKorttilgang] = useState(false);
    const [hasFetchedLoc, setHasFetchedLoc] = useState(false);
    let places = [];
    useEffect(() => {
        if (!hasFetchedData) {
            fetch("/api")
                .then((response) => response.json())
                .then((data) => {
                    setPois(data);
                    setHasFetchedData(true);
                });
        }
    }, [hasFetchedData]);
    useEffect(() => {
        if (!hasFetchedLoc) {
            navigator.geolocation.getCurrentPosition((position) => {
                setBrukerPosisjon(position.coords);
                setHasFetchedLoc(true);
            });
        }
    }, [hasFetchedLoc]);

    const poisW = pois.filter(
        (element) => element[6] != undefined || element[6] != null
    ); //punkter med vurdering
    const poisU = pois.filter(
        (element) => element[6] == undefined || element[6] == null
    ); //punkter uten vurdering
    function onChangeStoy(event) {
        setStoy(event.target.value);
    }

    function onChangeVurdering(event) {
        setVurdering(event.target.value);
    }

    function onChangeNerhet(event) {
        setNerhet(event.target.value);
    }

    function onChangeCheckedStoy() {
        setCheckStoy(!checkStoy);
    }

    function onChangeCheckedVurdering() {
        setCheckVurdering(!checkVurdering);
    }

    function onChangeCheckedNerhet() {
        setCheckNerhet(!checkNerhet);
    }

    function onChangeKorttilgang() {
        setKorttilgang(!korttilgang);
    }

    function onChangeStorrelse(event) {
        setStorrelse(event.target.value);
    }

    function onChangeCheckedStorrelse() {
        setCheckStorrelse(!checkStorrelse);
    }

    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371;
        const dLat = deg2Rad(lat2 - lat1);
        const dLon = deg2Rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2Rad(lat1)) *
                Math.cos(deg2Rad(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d * 1000;
    }
    function deg2Rad(deg) {
        return deg * (Math.PI / 180);
    }

    function YagerIntersection() {
        let liste_med_plasser = [];
        if (korttilgang) {
            liste_med_plasser = pois.filter((element) => element[8] == true);
        } else {
            liste_med_plasser = pois.filter((element) => element[8] == false);
        }
        const valgtVurdering = vurdering;
        const valgtStoy = stoy;
        const valgtAvstand = nerhet * 1000;
        const valgtStorrelse = storrelse;
        const vekt = 10;
        let bestePlasser = [];
        for (let i = 0; i < liste_med_plasser.length; i++) {
            const plass = liste_med_plasser[i];
            const avstand = calculateDistance(
                brukerPosisjon.latitude,
                brukerPosisjon.longitude,
                plass[2],
                plass[1]
            );
            const a = 1 - Math.abs(plass[7] - valgtVurdering) / 5;
            const b = 1 - Math.abs(plass[6] - valgtStoy) / 5;
            let c =
                avstand < valgtAvstand
                    ? 1
                    : Math.abs(avstand - valgtAvstand) / 1000;
            if (c < 0) {
                c = 0;
            }
            const d = 1 - Math.abs(plass[9] - valgtStorrelse) / 100;
            const snitt =
                1 -
                Math.min(
                    1,
                    ((1 - a) ** vekt +
                        (1 - b) ** vekt +
                        (1 - c) ** vekt +
                        (1 - d) ** vekt) **
                        (1 / vekt)
                );
            const point = [plass[0], snitt, avstand ];
            if (bestePlasser.length < 5 || bestePlasser[4].snitt < snitt) {
                if (bestePlasser.length < 5) {
                    bestePlasser.push(point);
                } else {
                    bestePlasser.pop();
                    bestePlasser.push(point);
                }
            }
            bestePlasser.sort(function (a, b) {
                return b.snitt - a.snitt;
            });
        }
        places = bestePlasser;
        setBestPlaces(bestePlasser);
    }

    function middleNumber() {
        let liste_med_plasser = [];
        if (korttilgang) {
            liste_med_plasser = pois.filter((element) => element[8] == true);
        } else {
            liste_med_plasser = pois.filter((element) => element[8] == false);
        }
        let vektStoy = checkStoy ? 5 : 1;
        let vektVurdering = checkVurdering ? 5 : 1;
        let vektAvstand = checkNerhet ? 5 : 1;
        let vektStorrelse = checkStorrelse ? 5 : 1;
        const sumVekter = vektStoy + vektVurdering + vektAvstand;
        vektStoy /= sumVekter;
        vektVurdering /= sumVekter;
        vektAvstand /= sumVekter;
        let bestePlasser = [];
        for (let i = 0; i < liste_med_plasser.length; i++) {
            const plass = liste_med_plasser[i];
            const avstand = calculateDistance(
                brukerPosisjon.latitude,
                brukerPosisjon.longitude,
                plass[2],
                plass[1]
            );
            const a = 1 - Math.abs(plass[7] - vurdering) / 5;
            const b = 1 - Math.abs(plass[6] - stoy) / 5;
            let c =
                avstand < nerhet * 1000
                    ? 1
                    : Math.abs(avstand - nerhet * 1000) / 1000;
            if (c > 1) {
                c = 0;
            }
            const d = 1 - Math.abs(plass[9] - storrelse) / 1000;
            const snitt =
                vektVurdering * a +
                vektStoy * b +
                vektAvstand * c +
                vektStorrelse * d;
            const point = [plass[0], snitt,  avstand ];
            if (bestePlasser.length < 5 || bestePlasser[4].snitt < snitt) {
                if (bestePlasser.length < 5) {
                    bestePlasser.push(point);
                } else {
                    bestePlasser.pop();
                    bestePlasser.push(point);
                }
            }
            bestePlasser.sort(function (a, b) {
                return b.snitt - a.snitt;
            });
        }
        places = bestePlasser;
        setBestPlaces(bestePlasser);
    }

    function handleSubmit() {
        if (checkNerhet || checkStoy || checkVurdering || checkStorrelse) {
            middleNumber();
        } else {
            YagerIntersection();
        }
        navigate("/result", { state: { places } });
    }
    return (
        <>
            <div>
                <NavBar></NavBar>
            </div>
            <header className="header">
                <h1>Finn studieplass</h1>
            </header>
            <div className="filterBox">
                <div id="container">
                    <div className="headerWeights">
                        <div>
                            <p></p>
                        </div>
                            <h2 id="title">Støy </h2>
                            <div id="weight">
                                <input 
                                type="checkbox"
                                name="check"
                                onChange={onChangeCheckedStoy}
                            ></input>
                            <p>Viktig?</p>
                            </div>
                    </div>
                    <div className="choice"
                        onChange={onChangeStoy}>
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                        <p>4</p>
                        <p>5</p>
                        <input type="radio" id="1" value="1" name="stoy" />{" "}
                        
                        <input
                            type="radio"
                            id="1"
                            value="2"
                            name="stoy"
                        />{" "}
                        
                        <input
                            type="radio"
                            id="1"
                            value="3"
                            name="stoy"
                        />{" "}
                        
                        <input
                            type="radio"
                            id="1"
                            value="4"
                            name="stoy"
                        />{" "}
                        
                        <input
                            type="radio"
                            id="1"
                            value="5"
                            name="stoy"
                        />{" "}
                        
                    </div>
                </div>
                <div id="container">
                    <div className="headerWeights">
                        <div><p></p></div>
                        <h2>Vurdering</h2>
                        <div id="weight">
                            <input
                                type="checkbox"
                                name="check"
                                onChange={onChangeCheckedVurdering}
                            ></input>
                            <p>Viktig?</p>
                        </div>
                    </div>
                    <div className="choice"
                        onChange={onChangeVurdering}>
                        <p>
                         1
                        </p>
                        <p>
                         2
                        </p>
                        <p>
                         3
                        </p>
                        <p>
                         4
                        </p>
                        <p>
                         5
                        </p>
                        <input
                            type="radio"
                            id="1"
                            value="1"
                            name="vurdering"
                        />{" "}
                        <input
                            type="radio"
                            id="1"
                            value="2"
                            name="vurdering"
                        />{" "}
                        
                        <input
                            type="radio"
                            id="1"
                            value="3"
                            name="vurdering"
                        />{" "}
                        
                        <input
                            type="radio"
                            id="1"
                            value="4"
                            name="vurdering"
                        />{" "}
                        
                        <input
                            type="radio"
                            id="1"
                            value="5"
                            name="vurdering"
                        />{" "}
                    </div>
                </div>
                <div id="container">
                    <div className="headerWeights">
                        <div><p></p></div>
                            <h2 id="kort1">Har du korttilgang?</h2>
                        <div id="kort2">
                            <input
                                
                                type="checkbox"
                                name="check"
                                onChange={onChangeKorttilgang}
                            />
                        </div>
                    </div>
                </div>
                <div id="container">
                    <div className="headerWeights">
                        <div><p></p></div>
                            <h2 id="kort1">Antall plasser</h2>
                        <div id="weight">
                            <input
                                type="checkbox"
                                name="check"
                                onChange={onChangeCheckedStorrelse}
                            ></input>
                           <p>Viktig?</p> 
                        </div>
                        <div></div>
                        <input
                            type="range"
                            step={10}
                            min={10}
                            max={100}
                            value={storrelse}
                            onChange={onChangeStorrelse}
                        />
                        <p>Rundt {storrelse} plasser</p>
                    </div>
                </div>
                <div id="container">
                    <div className="headerWeights">
                        <div><p></p></div>
                            <h2>Avstand</h2>
                        <div id="weight">
                            <input
                                type="checkbox"
                                name="check"
                                onChange={onChangeCheckedNerhet}
                            ></input>
                            <p>Viktig?</p>
                            
                        </div>
                        <br />
                        <input
                            className="slidecontainer"
                            type="range"
                            step={0.1}
                            min={1}
                            max={5}
                            value={nerhet}
                            onChange={onChangeNerhet}
                        />
                        <p>km: {nerhet}</p>
                    </div>
                </div>
                <div id="element">
                    <button id="sok" onClick={handleSubmit}>
                        Finn leseplass
                    </button>
                </div>
            </div> {/* filterBox*/}
        </>
    );
}
