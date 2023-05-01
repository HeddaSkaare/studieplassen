import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import Mazemap from "mazemap-api";
import React, { useEffect, useState} from 'react';
import { Marker, Popup } from "react-leaflet";
import { useNavigate } from 'react-router-dom';
import points from '../data/pointIds.json';
import info from '../data/infos.json';
import {makeVar } from '@apollo/client';
import result from '../components/results.jsx'


const iconP = L.icon({
  iconUrl: require('../static/icons/Point2.png'),
  iconSize: 40
})

export const poiId = makeVar("");
export const poiName = makeVar("");
function Markers() {

  const myList = points.filter((element) => info[element] != undefined);
  const navigate = useNavigate();
  const [reload, setReload] = useState(false);
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const [pois,setPois] = useState([]);
  useEffect(()=>{
    if (!hasFetchedData) {
    fetch('/api')
      .then(response => response.json())
      .then(data => {
        setPois(data);
        console.log(data);
        setHasFetchedData(true);
      })
    }
  }, [hasFetchedData]);
  const poisW = pois.filter((element) => (element[6] != undefined || element[6] != null));
  const poisU = pois.filter((element) => (element[6] == undefined || element[6] == null));
  function Click(point,name) {
    poiId(point)
    poiName(name)
    navigate("/addplace")
  }
  useEffect(() => {
    if (reload) {
      setReload(false);
    }
  }, [reload]);




  return (
    <div>
      {
        poisW.map((point)=>{
          const coord = [point[2],point[1]]
          const floor = point[3]
          const name = point[5]
          const building = point[4]
          return (
            <Marker position={coord} icon={iconP} onClick={()=> setReload(true)}>
              <Popup>
                <p><b>{name}</b></p>
                <p>{building}</p>
                <p>floor: {floor}</p>
                <p>StoyNiva {point[6]}, Vurdering {point[7]}</p>
                <p>Korttilgang {point[8] ? 'Ja' : 'Nei'}, kapasitet {point[9]}</p>
                <button onClick={() => Click(point[0],name)}>Legg til info</button>
              </Popup>
            </Marker>)
        })
      }
      {
        poisU.map((point)=>{
          const coord = [point[2],point[1]]
          const floor = point[3]
          const name = point[5]
          const building = point[4]
          return (
            <Marker position={coord} icon={iconP} onClick={()=> setReload(true)}>
              <Popup>
                <p><b>{name}</b></p>
                <p>{building}</p>
                <p>Floor: {floor}</p>
                <button onClick={() => Click(point[0],name)}>Legg til info</button>
              </Popup>
            </Marker>)
        })
      }
    </div>
  )
  ;
}

export default Markers;


// {
//   myList.map((point)=>{
//     const coord = [info[point].coordinates[1], info[point].coordinates[0]]
//     const floor = info[point].floorname
//     const name = info[point].maptext
//     const building = info[point].buildingName
//     return (
//       <Marker position={coord} icon={iconP} onClick={()=> setReload(true)}>
//         <Popup>
//           <p><b>{name}</b></p>
//           <p>{building}</p>
//           <p>{floor}</p>
//           <button onClick={() => Click(point,name)}>Legg til info</button>
//         </Popup>
//       </Marker>)
//   })
// }