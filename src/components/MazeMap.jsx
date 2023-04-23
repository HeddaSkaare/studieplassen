import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import Mazemap from "mazemap-api";
import React, { useEffect, useState } from 'react';
import Markers from './markers';


const Points = () =>  {
  
  
 
  return (
    <div>
      {
        points2.map((poi)=>{
          const coord = [poi.point.coordinates[1],poi.point.coordinates[0]]
          const name = poi.mapText;
          const floorLevel = poi.floorName;
          return (
            <Markers name={name} coord={coord} floorlevel={floorLevel}/>
          )
          })
      }
    </div>
  )
}

export default Points;
//let info = {"poiId":data.poiId,"point": {"type": "Point", "coordinates": data.point.coordinates}, "campusId": data.campusId, "floorName": data.floorName, "buildingId": data.buildingId, "buildingName": data.buildingName, "mapText": data.mapText}

//            const coord = [poi.point.coordinates[1],poi.point.coordinates[0]]
//           const name = poi.mapText;
//           const floorLevel = poi.floorName;
//           return (
//             Markers(name,coord,floorLevel)
//           )