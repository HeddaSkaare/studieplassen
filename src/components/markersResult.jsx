import { useReactiveVar } from '@apollo/client';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from 'react';
import { Marker,Tooltip, Popup } from "react-leaflet";
import info from '../data/infos.json';
import vurdering from '../data/vurdering.json';
import {clicked} from './results'
import { makeVar } from "@apollo/client";
import { useLocation } from "react-router-dom";

const iconP = L.icon({
  iconUrl: require('../static/icons/Point2.png'),
  iconSize: 40
})

const iconB = L.icon({
  iconUrl: require('../static/icons/Point3.png'),
  iconSize: 70
})
export let clickedPoint = makeVar("")
function MarkersResult() {
 
  let clicked2 = useReactiveVar(clicked);
  const resultPID= []
  vurdering.data.map((e)=> {resultPID.push(e.poiId)});

  const myList =resultPID.filter((element) => info[element] != undefined);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (reload) {
      setReload(false);
    }
  }, [reload]);


  function handleClick(poi){
    clickedPoint(poi);
  }
  const [hasFetchedData, setHasFetchedData] = useState(false);
    const [pois, setPois] = useState([]);
    const location = useLocation();
    const { places } = location.state;
    useEffect(() => {
        console.log("places",places);
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
   
    const res1 = pois.filter((element) => places.find(obj => obj[0] === element[0]));
    console.log("filter",res1)

  //punktId = point[i][0], cordinater = [point[i][2],point[i][1]], floor = point[i][3], building = point[i][4], name = point[i][5]
    //stoyNivaa = point[i][6], Vurdering= point[i][7], Korttilgang = point[i][8], kapasitet =point[i][9]
  return (
    <div>
      {
        res1.map((point)=>{
          const coord = [point[2],point[1]]
          const name = point[5]
          if(clicked2 == point[0]){
            return (<Marker position={coord} icon={iconB}  onClick={() => handleClick(point)}>
             <Tooltip className="my-tooltip" direction="top" 
             offset={[0, -15]} opacity={0.9} permanent>{name}</Tooltip>
            </Marker>)
          }
          return ( 
            <Marker position={coord} icon={iconP}  onClick={() => handleClick(point)}>
            </Marker>)
        })
      }
    </div>
  )
  ;
}

export default MarkersResult;
