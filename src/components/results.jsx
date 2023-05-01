import "leaflet/dist/leaflet.css";
import vurderinger from "../data/vurdering.json"
import points from "../data/pointInfo.json";
import NavBar from "./navBar";
import MapResult from "./mapResult";
import React, {useRef,useState} from 'react';
import L from 'leaflet';
import { makeVar,useReactiveVar } from "@apollo/client";
import { clickedPoint } from "./markersResult";

export let clicked = makeVar("")
function Results(){

    let clicked2 = useReactiveVar(clickedPoint);
    const pois = [];
    console.log("Okei")
    vurderinger.data.forEach((e)=>{
        console.log()
        const poID = e.poiId;
        var navn = undefined
        var bygningnavn = undefined
        var kort = undefined
        points.points.forEach((poi)=>{
            if(poi.poiId===poID)
            {navn = poi.mapText 
            bygningnavn = poi.buildingName}})

        const vur = e.Vurdering;
        const stoy = e.StoyNiva;
        if(e.Korttilgan){
            kort="Må ha korttilgang"
        } else{
            kort="Trenger ikke korttilgang"
        }
        const cap = e.kapasitet;
        const avst= e.Avstand;
        pois.push({poID,navn,bygningnavn,vur,stoy,kort,cap,avst})})

    function handleClick(poi){
        clicked(poi);
    }
    //console.log(pois)
    return(
    <div>
        <NavBar></NavBar>
        <div className="container">
            <div className='sideBar'>
                <h3>
                    Dine beste studieplasser
                </h3>          
                <div className='sideBar2'>
                    
                    {pois.map((item)=>{
                        if(clicked2 == item.poiID){
                            return(
                                <div className='result1' onClick={() => handleClick(item.poID)} >
                           
                                    <p id='first'>{item.navn}</p>
                                    <p id='second'>{item.bygningnavn}</p>
                                    <div className= "boxContainer"> 
                                        <div id="left">
                                            <p> Vurdering: {item.vur}</p>
                                            <p> Kapasitet: {item.cap}</p>
                                        </div>
                                        <div id="right">
                                        <p> Støynivå: {item.stoy}</p>
                                        <p> Avstand: {item.avst} m</p>
                                    </div>
                                </div>
                                <p id='five'> {item.kort}</p>
                                </div>      
                            )
                        }
                        return(
                            <div className='result'onClick={() => handleClick(item.poID)} >
                       
                                <p id='first'>{item.navn}</p>
                                <p id='second'>{item.bygningnavn}</p>
                                <div className= "boxContainer"> 
                                    <div id="left">
                                        <p> Vurdering: {item.vur}</p>
                                        <p> Kapasitet: {item.cap}</p>
                                    </div>
                                    <div id="right">
                                    <p> Støynivå: {item.stoy}</p>
                                    <p> Avstand: {item.avst} m</p>
                                </div>
                            </div>
                            <p id='five'> {item.kort}</p>
                            </div>      
                        )})
                    }
                </div> 
            </div>  
            <div>
                <MapResult></MapResult>
            </div> 
        </div>
    </div>
    )
};
export default Results; 
