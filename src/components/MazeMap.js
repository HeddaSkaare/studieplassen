import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import Mazemap from "mazemap-api";
import React, { useEffect, useState } from 'react';





const Points = () =>  {
  const urlsP = [
    'https://api.mazemap.com/api/campus/1/poitypes/4232/pois/', 
    'https://api.mazemap.com/api/campus/21/poitypes/16/pois/', 
    'https://api.mazemap.com/api/campus/18/poitypes/7/pois/', 
    'https://api.mazemap.com/api/campus/3/poitypes/7/pois/'
  ];
  const urlsI = 'https://api.mazemap.com/api/pois/577046/?srid=4326'
  const [points] = useState([]);
  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      for(const url of urlsP){
        await fetch(url)
        .then((response)=> response.json())
        .then((data)=> data.pois.forEach(element => {
          points.push(element.poiId)
        }))
      }
    };
    dataFetch();
  }, []);

  console.log("jekldw",points)
    // const [array, setArray] = useState([]);
    // const urls = ['https://api.mazemap.com/api/campus/1/poitypes/4232/pois/', 'https://api.mazemap.com/api/campus/21/poitypes/16/pois/', 'https://api.mazemap.com/api/campus/18/poitypes/7/pois/', 'https://api.mazemap.com/api/campus3/poitypes/7/pois/'];
    // for(const url of urls) {
    //     useEffect(() => {
    //         fetch(url)
    //         .then((response)=> response.json())
    //         .then((data)=>setArray(data.pois.map((poi)=> poi.point.poiId)))
    //     })
    // }
    // const poi = useEffect(() => {
    //     for(const url of urls){
    //         fetch(url)
    //         .then((response)=> response.json())
    //         .then((data)=>console.log(data.pois))
    //         //.then((data)=>setArray(data.pois.map((poi)=> poi.point.poiId)))
    //     }
    // })
    // console.log("array: ",poi)
  // const [Pglos, setPglos] = useState([]);
  // const [Pkalv, setPkalv] = useState([]);
  // const [Pdrag, setPdrag] = useState([]);
  // const [Poya, setPoya] = useState([]);
  // const punkt = 
  // useEffect(() => {
  //   fetch('https://api.mazemap.com/api/campus/1/poitypes/4232/pois/')
  //   .then((response)=> response.json())

  //   //.then((data)=> console.log(data))
  //   .then((data)=>
  //   //console.log(data.pois.map((poi)=> poi.point.coordinates), "wæ"),
  //   //data.pois.map((poi)=>console.log(poi.point.coordinates))
  //   setPglos(data.pois.map((poi)=> poi.poiId))
  //   )
  // },[]);
  // useEffect(() => {
  //   fetch('https://api.mazemap.com/api/campus/21/poitypes/16/pois/')
  //   .then((response)=> response.json())

  //   //.then((data)=> console.log(data))
  //   .then((data)=>
  //   //console.log(data.pois.map((poi)=> poi.point.coordinates), "wæ"),
  //   //data.pois.map((poi)=>console.log(poi.point.coordinates))
  //   setPkalv(data.pois.map((poi)=> poi.poiId))
  //   )
  // },[]);
  // useEffect(() => {
  //   console.log(Mazemap.getPOI(1));
  //   fetch('https://api.mazemap.com/api/campus/18/poitypes/7/pois/')
  //   .then((response)=> response.json())

  //   //.then((data)=> console.log(data))
  //   .then((data)=>
  //   //console.log(data.pois.map((poi)=> poi.point.coordinates), "wæ"),
  //   //data.pois.map((poi)=>console.log(poi.point.coordinates))
  //   setPdrag(data.pois.map((poi)=> poi.poiId))
  //   )
  // },[]);
  // useEffect(() => {
  //   fetch('https://api.mazemap.com/api/campus/3/poitypes/7/pois/')
  //   .then((response)=> response.json())

  //   //.then((data)=> console.log(data))
  //   .then((data)=>
  //   //console.log(data.pois.map((poi)=> poi.point.coordinates), "wæ"),
  //   //data.pois.map((poi)=>console.log(poi.point.coordinates))
  //   setPoya(data.pois.map((poi)=> poi.poiId))
  //   )
  // },[]);
  return ;
}

export default Points;