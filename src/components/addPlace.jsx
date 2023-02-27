import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import TimePicker from "react-bootstrap-time-picker";
import NavBar from "./navBar";
export default function AddPlace() {
    const [noice, setNoice] = useState("");
    const [rating, setRating] = useState("")
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("")
    function validateForm() {
      return noice.length > 0 && rating <= 10 && rating>=1;
    }
    function handleSubmit(event) {
      event.preventDefault();
    }
    return (
        <div>
            <NavBar />
      <div>
      <header id='header'><h1>Legg Til Info</h1></header>
    <Form className="Login" onSubmit={handleSubmit}>
          <Form.Group className="email" size="lg" controlId="email">
            <Form.Label className="email">Støy</Form.Label>
            <br></br>
            <Form.Control
              autoFocus
              className="Text"
              type="text"
              value={noice}
              onChange={(e) => setNoice(e.target.value)}
              />
          </Form.Group>
          <Form.Group className="email" size="lg" controlId="email">
            <Form.Label className="email">Vurdering</Form.Label>
            <br></br>
            <Form.Control
              autoFocus
              className="Text"
              type="text"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              />
          </Form.Group>
          <Form.Label className="email"> Tilgjengelighet</Form.Label>
          <br />
          <TimePicker className="email" step={60} value={from} onChange={(e) => setFrom(e)} />
          <TimePicker className="email" step={60} value={to} onChange={(e) => setTo(e)} />
          <br />
          <Button block size="lg" type="submit" disabled={!validateForm()}>
            Legg Til
          </Button>
        </Form>
              </div>
              </div>
    );
  }