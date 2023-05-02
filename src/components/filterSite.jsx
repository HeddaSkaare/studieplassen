import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../css/filterSite.css";
import NavBar from "./navBar";

export default function FilterSite() {
    const [stoy, setStoy] = useState(3);
    const [checkStoy, setCheckStoy] = useState(false);
    const [storrelse, setStorrelse] = useState(50);
    const [checkStorrelse, setCheckStorrelse] = useState(false);
    const [vurdering, setVurdering] = useState(5);
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

    const [stoyT,setStoyT]=useState("Middels")
    const stoyArray = ["Helt stille","Litt stille","Middels","Litt støy", "Støy"]

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
        event.preventDefault();
        
        var i = event.target.value 
        setStoyT(stoyArray[i-1])
        setStoy(event.target.value);
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
            const a = 1 - Math.abs(plass[7] - vurdering) / 5;
            const b = 1 - Math.abs(plass[6] - stoy) / 5;
            let c =
                avstand < nerhet * 1000
                    ? 1
                    : avstand - nerhet * 1000 > 1000
                    ? 0
                    : 1 - Math.abs(avstand - nerhet * 1000) / 1000;
            const d = 1 - Math.abs(plass[9] * 10 - storrelse) / 100;
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
            const point = [plass[0], snitt, avstand];
            if (bestePlasser.length < 5 || bestePlasser[4][1] < snitt) {
                if (bestePlasser.length < 5) {
                    bestePlasser.push(point);
                } else {
                    bestePlasser.pop();
                    bestePlasser.push(point);
                }
            }
            bestePlasser.sort(function (a, b) {
                return b[1] - a[1];
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
        const sumVekter =
            vektStoy + vektVurdering + vektAvstand + vektStorrelse;
        vektStoy /= sumVekter;
        vektVurdering /= sumVekter;
        vektAvstand /= sumVekter;
        vektStorrelse /= sumVekter;
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
            const d = 1 - Math.abs(plass[9] * 10 - storrelse) / 100;
            const snitt =
                vektVurdering * a +
                vektStoy * b +
                vektAvstand * c +
                vektStorrelse * d;
            const point = [plass[0], snitt, avstand];
            if (bestePlasser.length < 5 || bestePlasser[4][1] < snitt) {
                if (bestePlasser.length < 5) {
                    bestePlasser.push(point);
                } else {
                    bestePlasser.pop();
                    bestePlasser.push(point);
                }
            }
            bestePlasser.sort(function (a, b) {
                return b[1] - a[1];
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
            <div className="box" id="boxF">
                <div className="boxElement">
                    <div className="headerWeights">
                        <div>
                            <p></p>
                        </div>
                        
                        <h2 id="title">Støy </h2>
                        <div className="weight">
                            <input
                                id="check1"
                                type="checkbox"
                                name="check"
                                onChange={onChangeCheckedStoy}
                            ></input>
                            <label for= "check1">Viktig</label>
                        </div>
                    </div>
                
                         <input
                            className="slider"
                            type="range"
                            min={1}
                            max={5}
                            value={stoy}
                            onChange={onChangeStoy}
                        />
                        <p> {stoyT}</p>
                </div>
                <div className="boxElement">
                    <div className="headerWeights">
                        <div>
                            <p></p>
                        </div>
                        <h2 >Antall plasser</h2>
                        <div className="weight">
                            <input
                                id="check2"
                                type="checkbox"
                                name="check"
                                onChange={onChangeCheckedStorrelse}
                            ></input>
                            <label for= "check2">Viktig</label>
                        </div>
                    </div>
                        <div></div>
                        <input
                        className="slider"
                            type="range"
                            step={10}
                            min={10}
                            max={100}
                            value={storrelse}
                            onChange={onChangeStorrelse}
                        />
                        <p>Rundt {storrelse} plasser</p>
                
                </div>
                <div className="boxElement">
                    <div className="headerWeights">
                        <div>
                            <p></p>
                        </div>
                        <h2>Avstand</h2>
                        <div className="weight">
                            <input
                                id="check3"
                                type="checkbox"
                                name="check"
                                onChange={onChangeCheckedNerhet}
                            ></input>
                            <label for= "check3">Viktig</label>
                        </div>
                    </div>
                       
                        <input
                            className="slider"
                            type="range"
                            step={0.1}
                            min={1}
                            max={5}
                            value={nerhet}
                            onChange={onChangeNerhet}
                        />
                        <p>{nerhet} km unna</p>
                    
                </div>
                 <div className="gridF">
                    <div className="boxElement">
                            <h2 id="kort1"> Høyt vurdert?</h2>
                            <div className="weight" id="weight4">
                                <input
                                    id="check4"
                                    type="checkbox"
                                    name="check"
                                    onChange={onChangeCheckedVurdering}
                                ></input>
                                <label for= "check4">Viktig</label>
                            
                            </div>
                        
                    </div>

                
                    <div className="boxElement">
                            <h2 >Har du korttilgang?</h2>
                            <Button className="button" onClick={onChangeKorttilgang}>
                                {korttilgang ? "Ja" : "Nei"}
                            </Button>
                    </div>
                </div>
                <div id="element">
                    <button 
                    className="button"
                    id="addForm" 
                    onClick={handleSubmit}>
                        Finn leseplass
                    </button>
                </div>
            </div>{" "}

        </>
    );
}
