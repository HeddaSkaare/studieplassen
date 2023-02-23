import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  useMapEvent,
  useMapEvents,
} from 'react-leaflet';
import React, {useRef,useState} from 'react';
import Markers from './markers'
import L from 'leaflet'

const iconYou = L.icon({
    iconUrl: require('../static/icons/Pointer.png'),
    iconSize: 40
})

function SetViewOnClick({ animateRef }) {
    const map = useMapEvent('click', (e) => {
      map.setView(e.latlng, map.getZoom(), {
        animate: animateRef.current || false,
      })
    })
  
    return null
}
function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  
    return position === null ? null : (
      <Marker id='you_marker' icon={iconYou} position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
}

function Map(){
    const animateRef = useRef(false)
    return(
    <MapContainer id = 'map' center={[63.418277, 10.403647]} zoom={13} scrollWheelZoom={true}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Markers></Markers>
        <LocationMarker></LocationMarker>
        <SetViewOnClick animateRef={animateRef} />
    </MapContainer>
    )
};
export default Map;
