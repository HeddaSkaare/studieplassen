import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import TimePicker from "react-bootstrap-time-picker";
import { useNavigate } from 'react-router-dom';
import NavBar from "./navBar";
import {poiId,poiName} from  "./markers";
import {useReactiveVar } from '@apollo/client';

export default function AddPlace() {
    const Id = useReactiveVar(poiId);
    const name = useReactiveVar(poiName)
    const [noice, setNoice] = useState(3);
    const [rating, setRating] = useState(3);
    const [cardEntrance, setCardEntrance] = useState(false);
    const [capasity, setCapasity] = useState(3);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const navigate = useNavigate();
  
    function validateForm() {
      return noice.length > 0 && rating <= 10 && rating>=1;
    }
    function handleSubmit(event) {
      event.preventDefault();
      const poiId = Id;
      const StoyNiva = noice;
      const Vurdering = rating;
      const Korttilgang = cardEntrance;
      const kapasitet = capasity;
      fetch('http://localhost:3000/addplace', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ poiId, StoyNiva,Vurdering,Korttilgang,kapasitet})
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
      navigate("/");
    }
    function handleNoiceChange(event) {
      event.preventDefault();
      setNoice(event.target.value)
    }
    function handleRatingChange(event) {
      event.preventDefault();
      setRating(event.target.value)
    }
    function handleCapasityChange(event) {
      event.preventDefault();
      setCapasity(event.target.value)
    }
    function handleClick() {
      setCardEntrance(!cardEntrance);
    }
    return (
        <div>
            <NavBar />
      <div>
      <header id='header'><h1>Legg Til Info til {name} </h1></header>
    <Form className="Login" onSubmit={handleSubmit}>
          <Form.Group className="email" size="lg" controlId="email">
            <Form.Label className="email">Støy</Form.Label>
            <br></br>
            <input type="range" min={1} max={5} value={noice} onChange={handleNoiceChange} />
      <p>Value: {noice}</p>
          </Form.Group>
          <Form.Group className="email" size="lg" controlId="email">
            <Form.Label className="email">Vurdering</Form.Label>
            <br></br>
            <input type="range" min={1} max={5} value={rating} onChange={handleRatingChange} />
      <p>Value: {cardEntrance}</p>
          </Form.Group>
          <Form.Group className="email" size="lg" controlId="email">
          <Form.Label className="email">Korttilgang</Form.Label>
          <Button id = "korttilgang" onClick={handleClick}>
            {cardEntrance ? 'Access Granted' : 'Access Denied'}
          </Button>
      <p>Value: {capasity}</p>
          </Form.Group>
          <Form.Group className="email" size="lg" controlId="email">
            <Form.Label className="email">capasitet</Form.Label>
            <br></br>
            <input type="range" min={1} max={5} value={capasity} onChange={handleCapasityChange} />
      <p>Value: {rating}</p>
          </Form.Group>
          <Form.Label className="email"> Tilgjengelighet</Form.Label>
          <br />
          <TimePicker className="email" step={60} value={from} onChange={(e) => setFrom(e)} />
          <TimePicker className="email" step={60} value={to} onChange={(e) => setTo(e)} />
          <br />
          <Button id = "addVurdering" block size="lg" type="submit" disabled={!validateForm()}>
            Legg Til
          </Button>
        </Form>
              </div>
              </div>
    );
  }
