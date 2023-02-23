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


function StudyCard(){
    
    return(
        <div id='studyCard_holder'>
            <div id='study-card' >
                <div className='studyCard_img'>
                    <img src={'../static/bilder/lesesal1.jpeg'}/>
                </div>
                <div className='studyCard_info'>
                    <h2 className='movieCardTitle'>
                        Lesesal 1
                    </h2>
                    <div id='study_stats'>
                        <p id='rating'> Vurdering: 4 </p>
                        <p id='pris'> Pris: $</p>
                        <p id='belastning'> Belastning: 50%</p>
                    </div>
                    <p id='description'>
                        Fin lesesal plass på gløshaugen.
                    </p>
                </div>
            </div>
            <div id='study-card2' >
                <div className='studyCard_img'>
                    <img src={'../static/bilder/lesesal2.jpeg'}/>
                </div>
                <div className='studyCard_info'>
                    <h2 className='movieCardTitle'>
                        Lesesal 1
                    </h2>
                    <div id='study_stats'>
                        <p id='rating'> Vurdering: 4 </p>
                        <p id='pris'> Pris: $</p>
                        <p id='belastning'> Belastning: 50%</p>
                    </div>
                    <p id='description'>
                        Fin lesesal plass på gløshaugen.
                    </p>
                </div>
            </div>
            <div id='study-card3' >
                <div className='studyCard_img'>
                    <img src={'../static/bilder/lesesal3.gif'}/>
                </div>
                <div className='studyCard_info'>
                    <h2 className='movieCardTitle'>
                        Lesesal 1
                    </h2>
                    <div id='study_stats'>
                        <p id='rating'> Vurdering: 4 </p>
                        <p id='pris'> Pris: $</p>
                        <p id='belastning'> Belastning: 50%</p>
                    </div>
                    <p id='description'>
                        Fin lesesal plass på gløshaugen.
                    </p>
                </div>
            </div>
            <div id='study-card4' >
                <div className='studyCard_img'>
                    <img src={'../static/bilder/lesesal4.jpeg'}/>
                </div>
                <div className='studyCard_info'>
                    <h2 className='movieCardTitle'>
                        Lesesal 1
                    </h2>
                    <div id='study_stats'>
                        <p id='rating'> Vurdering: 4 </p>
                        <p id='pris'> Pris: $</p>
                        <p id='belastning'> Belastning: 50%</p>
                    </div>
                    <p id='description'>
                        Fin lesesal plass på gløshaugen.
                    </p>
                </div>
            </div>
        </div>
        
    )
};
export default StudyCard;
