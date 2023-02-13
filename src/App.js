import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { MapContainer, TileLayer } from "react-leaflet";
import "./App.css";

function App() {
    return (
        <div>
            <div>
                <Navbar bg="primary" variant="dark">
                    <Container>
                        <Navbar.Brand href="#">Navbar</Navbar.Brand>
                    </Container>
                </Navbar>
            </div>
            <div>
                <MapContainer
                    center={[63.43, 10.39]}
                    zoom={14}
                    scrollWheelZoom={false}
                    preferCanvas={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
            </div>
        </div>
    );
}

export default App;
