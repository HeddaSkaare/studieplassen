import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useRef, useState } from "react";
import {
    MapContainer,
    Marker,
    TileLayer,
    Tooltip,
    useMapEvent,
    useMapEvents
} from "react-leaflet";
import Markers from "./markers";

const iconYou = L.icon({
    iconUrl: require("../static/icons/Pointer.png"),
    iconSize: 40
});

function SetViewOnClick({ animateRef }) {
    const map = useMapEvent("click", (e) => {
        map.setView(e.latlng, map.getZoom(), {
            animate: animateRef.current || false
        });
    });

    return null;
}
function LocationMarker() {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
        click() {
            map.locate();
        },
        locationfound(e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        }
    });

    return position === null ? null : (
        <Marker id="you_marker">
            <Tooltip
                direction="top"
                offset={[0, -15]}
                icon={iconYou}
                position={position}
                opacity={0.9}
                permanent
            >
                {"Du er her"}
            </Tooltip>
        </Marker>
    );
}

function Map() {
    const animateRef = useRef(false);

    return (
        <MapContainer
            id="map"
            center={[63.416877, 10.405647]}
            zoom={14}
            scrollWheelZoom={true}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Markers></Markers>
            <LocationMarker></LocationMarker>
            <SetViewOnClick animateRef={animateRef} />
        </MapContainer>
    );
}
export default Map;
