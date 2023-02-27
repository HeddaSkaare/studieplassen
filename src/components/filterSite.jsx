import React, { useState } from "react";
import { Button, htmlForm } from "react-bootstrap";
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
//   const [stoy,setStoy] = useState();
//   const [tilgjengelighet,setTilgjengelighet] = useState();
//   const [vurdering,setVurdering] = useState();
//   const [nerhet,setNerhet] = useState();
 
//   const btn = document.querySelector('#sok');
//   const radioButtons = document.querySelectorAll('input[name="styles"]');
//   btn.addEventListener("click", ()=>{
//     let selectedStoy;
//     htmlFor (const radioButton of radioButtons){
//         if (radioButton.checked){
//             selectedStoy = radioButton.value;
//             break;
//         }
//         console.log(selectedStoy)
//     }
    
//   })
  const radioButtons1 = document.querySelectorAll('input[name="styles"]');
  const radioButtons2 = document.querySelectorAll('input[name="styles1"]');
  const radioButtons3 = document.querySelectorAll('input[name="styles2"]');
  const radioButtons4 = document.querySelectorAll('input[name="styles3"]');

  function handleSubmit(event) {
    let selectedStoy;
    let selectedTilgjengelighet;
    let selectedVurdering;
    let selectedNerhet;
    
    for (const radioButton1 of radioButtons1){
        if (radioButton1.checked){
            selectedStoy = radioButton1.value;
            break;
        }
    }
    for (const radioButton2 of radioButtons2){
        if (radioButton2.checked){
            selectedTilgjengelighet = radioButton2.value;
            break;
        }
    }
    for (const radioButton3 of radioButtons3){
        if (radioButton3.checked){
            selectedVurdering = radioButton3.value;
            break;
        }
    }
    for (const radioButton4 of radioButtons4){
        if (radioButton4.checked){
            selectedNerhet = radioButton4.value;
            break;
        }
    }
    console.log(selectedStoy)
    console.log(selectedTilgjengelighet)
    console.log(selectedVurdering)
    console.log(selectedNerhet)
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
            <div id='stoy' >
                <input type="radio" name="styles" id="box-shadow" className="custom-radio" value={1}></input><label htmlFor="box-shadow">1</label>
                <input type="radio" name="styles" id="box-shadow" className="custom-radio" value={2}></input><label htmlFor="box-shadow">2</label>
                <input type="radio" name="styles" id="box-shadow" className="custom-radio" value={3}></input><label htmlFor="box-shadow">3</label>
                <input type="radio" name="styles" id="box-shadow" className="custom-radio" value={4}></input><label htmlFor="box-shadow">4</label>
                <input type="radio" name="styles" id="box-shadow" className="custom-radio" value={5}></input><label htmlFor="box-shadow">5</label>
            </div>
        </div>
        <div id='element'>
            <h2>Tilgjengelighet</h2>
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
        </div>
        <div id='element'>
            <button id='sok' onClick={handleSubmit}>Finn leseplass</button>
        </div>
    </div>
    </>
  );
}