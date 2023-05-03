import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useRef,useState,useEffect } from "react";
import { MapContainer, TileLayer, useMapEvent,Marker,Tooltip } from "react-leaflet";
import MarkersResult from "./markersResult";

const iconYou = L.icon({
    iconUrl: require("../static/icons/Pointer.png"),
    iconSize: 50
});

function SetViewOnClick({ animateRef }) {
    const map = useMapEvent("click", (e) => {
        map.setView(e.latlng, map.getZoom(), {
            animate: animateRef.current || false
        });
    });

    return null;
}

function MapResult() {
    const animateRef = useRef(false);
    const [brukerPosisjon, setBrukerPosisjon] = useState([]);
    const [hasFetchedLoc, setHasFetchedLoc] = useState(false);
    useEffect(() => {
        const fetchLocation = async () => {
          try {
            const position = await navigator.geolocation.getCurrentPosition((position) => {
                setBrukerPosisjon([position.coords.latitude, position.coords.longitude]);
                setHasFetchedLoc(true);
            });
          } catch (error) {
            console.log("Error fetching location:", error);
          }
        };
    
        if (!hasFetchedLoc) {
          fetchLocation();
        }
      }, [hasFetchedLoc]);
    // const coordYou = [brukerPosisjon.latitude, brukerPosisjon.longitude]
    console.log("coord", brukerPosisjon)
    if (!hasFetchedLoc) {
        return <div>Loading...</div>;
    }
    return (
        <MapContainer
            id="mapR"
            center={brukerPosisjon}
            zoom={14}
            scrollWheelZoom={true}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={brukerPosisjon} icon={iconYou} >
            </Marker>
            <MarkersResult></MarkersResult>
            <SetViewOnClick animateRef={animateRef} />
        </MapContainer>
    );
}
export default MapResult;
