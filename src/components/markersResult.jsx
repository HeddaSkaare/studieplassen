import L, { tooltip } from 'leaflet';
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from 'react';
import { Marker,Tooltip, Popup } from "react-leaflet";
import info from '../data/infos.json';
import vurdering from '../data/vurdering.json';

const iconP = L.icon({
  iconUrl: require('../static/icons/Point2.png'),
  iconSize: 40
})


function Markers({ bgColor }) {
 

  const resultPID= []
  vurdering.data.map((e)=> {resultPID.push(e.poiId)});

  const myList =resultPID.filter((element) => info[element] != undefined);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (reload) {
      setReload(false);
    }
  }, [reload]);



  return (
    <div>
      {
        myList.map((point)=>{
          const coord = [info[point].coordinates[1], info[point].coordinates[0]]
          const name = info[point].maptext
          return ( 
            <Marker position={coord} icon={iconP}  onClick={()=> setReload(true)}>
            {/* <Tooltip className={style} direction="top" offset={[0, -15]} opacity={0.9} permanent>{name}</Tooltip> */}
             <Tooltip className="my-tooltip" direction="top" style={{ backgroundColor: bgColor }}
             offset={[0, -15]} opacity={0.9} permanent>cdd{name}</Tooltip>
            </Marker>)
        })
      }
    </div>
  )
  ;
}

export default Markers;
