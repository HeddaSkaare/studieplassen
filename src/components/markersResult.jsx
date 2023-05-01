import { useReactiveVar } from '@apollo/client';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from 'react';
import { Marker,Tooltip, Popup } from "react-leaflet";
import info from '../data/infos.json';
import vurdering from '../data/vurdering.json';
import {clicked} from './results'
import { makeVar } from "@apollo/client";

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

  return (
    <div>
      {
        myList.map((point)=>{
          const coord = [info[point].coordinates[1], info[point].coordinates[0]]
          const name = info[point].maptext
          if(clicked2 == point){
            return (
            <Marker position={coord} icon={iconB}  onClick={() => handleClick(point)}>
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
