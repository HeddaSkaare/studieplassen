import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "../css/filterSite.css";
import NavBar from "./navBar";

function RadioButtons(){
    return(
        <div>
            <input type="radio" id="1" value="1">1</input>
            <input type="radio" id="1" value="2">2</input>
            <input type="radio" id="1" value="3">3</input>
            <input type="radio" id="1" value="4">4</input>
            <input type="radio" id="1" value="5">5</input>
        </div>
    )
}

export default function FilterSite() {
  
  function handleSubmit(event) {
    event.preventDefault();
  }
  return (
    <>
    <div>
        <NavBar></NavBar>
    </div>
    <header id='header'><h1>Finn studieplass</h1></header>
    <div id='filterBox'>
        <div id='element'>
            <h2>Støy</h2>
            <div id='vurdering'>
                <input type="radio" name="styles" id="box-shadow" class="custom-radio"></input><label for="box-shadow">1</label>
                <input type="radio" name="styles" id="box-shadow" class="custom-radio"></input><label for="box-shadow">2</label>
                <input type="radio" name="styles" id="box-shadow" class="custom-radio"></input><label for="box-shadow">3</label>
                <input type="radio" name="styles" id="box-shadow" class="custom-radio"></input><label for="box-shadow">4</label>
                <input type="radio" name="styles" id="box-shadow" class="custom-radio"></input><label for="box-shadow">5</label>
            </div>
        </div>
        <div id='element'>
            <h2>Tilgjengelighet</h2>
            <div>
                <button id='button'>1</button>
                <button id='button'>2</button>
                <button id='button'>3</button>
                <button id='button'>4</button>
                <button id='button'>5</button>
            </div>
        </div>
        <div id='element'>
            <h2>Vurdering</h2>
            <div>
                <button id='button'>1</button>
                <button id='button'>2</button>
                <button id='button'>3</button>
                <button id='button'>4</button>
                <button id='button'>5</button>
            </div>
        </div>
        <div id='element'>
            <h2>Nærhet</h2>
            <div>
                <button id='button'>1</button>
                <button id='button'>2</button>
                <button id='button'>3</button>
                <button id='button'>4</button>
                <button id='button'>5</button>
            </div>
        </div>
        <div id='element'>
            <button id='sok'>Finn leseplass</button>
        </div>
    </div>
    </>
  );
}