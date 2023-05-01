import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/filterSite.css";
import data from "../data/vurdering.json";
import NavBar from "./navBar";

export default function FilterSite() {
    const [stoy, setStoy] = useState(3);
    const [checkStoy, setCheckStoy] = useState(false);
    const [vurdering, setVurdering] = useState(3);
    const [checkVurdering, setCheckVurdering] = useState(false);
    const [nerhet, setNerhet] = useState(3);
    const [checkNerhet, setCheckNerhet] = useState(false);
    const navigate = useNavigate();

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

    function YagerIntersection() {
        let liste_med_plasser = [];
        fetch("/api", {
            method: "GET"
        })
            .then((response) => {
                response.json();
                console.log(response);
            })
            .then((data) => console.log(data));
        const valgtVurdering = vurdering;
        const valgtStoy = stoy;
        const valgtAvstand = nerhet;
        const vekt = 10;
        let brukerPosisjon = 0;
        navigator.geolocation.getCurrentPosition((position) => {
            brukerPosisjon = position.coords;
        });
        for (let i = 0; i < liste_med_plasser.length; i++) {
            const plass = liste_med_plasser[i];
            const avstand = 0; // Må bergene avstand her
            const a = 1 - Math.abs(plass.Vurdering - valgtVurdering) / 5;
            const b = 1 - Math.abs(plass.StoyNiva - valgtStoy) / 5;
            let c =
                avstand < valgtAvstand
                    ? 1
                    : Math.abs(avstand - valgtAvstand) / 1000;
            if (c < 0) {
                c = 0;
            }
            const snitt =
                1 -
                Math.min(
                    1,
                    ((1 - a) ** vekt + (1 - b) ** vekt + (1 - c) ** vekt) **
                        (1 / vekt)
                );
            console.log("Vurdering: ", a, "Støynivå: ", b, "Snittet: ", snitt);
        }
    }

    function middleNumber() {
        let liste_med_plasser = data.data;
        let vektStoy = checkStoy ? 5 : 1;
        let vektVurdering = checkVurdering ? 5 : 1;
        let vektAvstand = checkNerhet ? 5 : 1;
        const sumVekter = vektStoy + vektVurdering + vektAvstand;
        vektStoy /= sumVekter;
        vektVurdering /= sumVekter;
        vektAvstand /= sumVekter;
        for (let i = 0; i < liste_med_plasser.length; i++) {
            const plass = liste_med_plasser[i];
            const avstand = 0; // Må bergene avstand her
            const a = 1 - Math.abs(plass.Vurdering - vurdering) / 5;
            const b = 1 - Math.abs(plass.StoyNiva - stoy) / 5;
            let c = avstand < nerhet ? 1 : Math.abs(avstand - nerhet) / 1000;
            if (c > 1) {
                c = 0;
            }
            const snitt = vektVurdering * a + vektStoy * b + vektAvstand * c;
            console.log("Vurdering: ", a, "Støynivå: ", b, "Snittet: ", snitt);
        }
    }

    function handleSubmit(event) {
        if (checkNerhet || checkStoy || checkVurdering) {
            middleNumber();
        } else {
            YagerIntersection();
        }
        // navigate("/");
    }
    return (
        <>
            <div>
                <NavBar></NavBar>
            </div>
            <header class="header">
                <h1>Finn studieplass</h1>
            </header>
            <p>Her kan du legge inn dine ønsker for studieplassen</p>
            <div id="filterBox">
                <div id="element">
                    <div class="headerWeights">
                        <div>
                            <h2>Støy</h2>
                        </div>
                        <div id="weight">
                            <input
                                type="checkbox"
                                name="check"
                                onChange={onChangeCheckedStoy}
                            ></input>
                            Viktig?
                        </div>
                        <br />
                        <div onChange={onChangeStoy}>
                            <input type="radio" id="1" value="1" name="stoy" />{" "}
                            1
                            <input
                                type="radio"
                                id="1"
                                value="2"
                                name="stoy"
                            />{" "}
                            2
                            <input
                                type="radio"
                                id="1"
                                value="3"
                                name="stoy"
                            />{" "}
                            3
                            <input
                                type="radio"
                                id="1"
                                value="4"
                                name="stoy"
                            />{" "}
                            4
                            <input
                                type="radio"
                                id="1"
                                value="5"
                                name="stoy"
                            />{" "}
                            5
                        </div>
                    </div>
                </div>
                <div id="element">
                    <div class="headerWeights">
                        <div>
                            <h2>Vurdering</h2>
                        </div>
                        <div id="weight">
                            <input
                                type="checkbox"
                                name="check"
                                onChange={onChangeCheckedVurdering}
                            ></input>
                            Viktig?
                        </div>
                        <br />
                        <div onChange={onChangeVurdering}>
                            <input
                                type="radio"
                                id="1"
                                value="1"
                                name="vurdering"
                            />{" "}
                            1
                            <input
                                type="radio"
                                id="1"
                                value="2"
                                name="vurdering"
                            />{" "}
                            2
                            <input
                                type="radio"
                                id="1"
                                value="3"
                                name="vurdering"
                            />{" "}
                            3
                            <input
                                type="radio"
                                id="1"
                                value="4"
                                name="vurdering"
                            />{" "}
                            4
                            <input
                                type="radio"
                                id="1"
                                value="5"
                                name="vurdering"
                            />{" "}
                            5
                        </div>
                    </div>
                </div>
                <div id="element">
                    <div class="headerWeights">
                        <div>
                            <h2>Avstand</h2>
                        </div>
                        <div id="weight">
                            <input
                                type="checkbox"
                                name="check"
                                onChange={onChangeCheckedNerhet}
                            ></input>
                            Viktig?
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

                {/*
            <div id='element'>
                <div class='headerWeights'>
                    <div>
                        <h2>Tilgjengelighet</h2>
                    </div>
                <div id= 'weight'>
                    <input type="checkbox" name="check"></input>
                    <label htmlFor="box-shadow"> Viktig? </label>
                </div>

                </div>

                <div>
                    <input type="radio" name="styles1" id="box-shadow" className="custom-radio" value={1}></input><label htmlFor="box-shadow">1</label>
                    <input type="radio" name="styles1" id="box-shadow" className="custom-radio" value={2}></input><label htmlFor="box-shadow">2</label>
                    <input type="radio" name="styles1" id="box-shadow" className="custom-radio" value={3}></input><label htmlFor="box-shadow">3</label>
                    <input type="radio" name="styles1" id="box-shadow" className="custom-radio" value={4}></input><label htmlFor="box-shadow">4</label>
                    <input type="radio" name="styles1" id="box-shadow" className="custom-radio" value={5}></input><label htmlFor="box-shadow">5</label>
                </div>
            </div>
            <div id='element'>
                <h2>Vurdering</h2>
                <div>
                    <input type="radio" name="styles2" id="box-shadow" className="custom-radio" value={1}></input><label htmlFor="box-shadow">1</label>
                    <input type="radio" name="styles2" id="box-shadow" className="custom-radio" value={2}></input><label htmlFor="box-shadow">2</label>
                    <input type="radio" name="styles2" id="box-shadow" className="custom-radio" value={3}></input><label htmlFor="box-shadow">3</label>
                    <input type="radio" name="styles2" id="box-shadow" className="custom-radio" value={4}></input><label htmlFor="box-shadow">4</label>
                    <input type="radio" name="styles2" id="box-shadow" className="custom-radio" value={5}></input><label htmlFor="box-shadow">5</label>
                </div>
            </div>
            <div id='element'>
                <h2>Nærhet</h2>
                <div>
                    <input type="radio" name="styles3" id="box-shadow" className="custom-radio" value={1}></input><label htmlFor="box-shadow">1</label>
                    <input type="radio" name="styles3" id="box-shadow" className="custom-radio" value={2}></input><label htmlFor="box-shadow">2</label>
                    <input type="radio" name="styles3" id="box-shadow" className="custom-radio" value={3}></input><label htmlFor="box-shadow">3</label>
                    <input type="radio" name="styles3" id="box-shadow" className="custom-radio" value={4}></input><label htmlFor="box-shadow">4</label>
                    <input type="radio" name="styles3" id="box-shadow" className="custom-radio" value={5}></input><label htmlFor="box-shadow">5</label>
                </div>
            </div> */}
                <div id="element">
                    <button id="sok" onClick={handleSubmit}>
                        Finn leseplass
                    </button>
                </div>
            </div>
        </>
    );
}
