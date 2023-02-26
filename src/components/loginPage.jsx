import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "../css/login.css";
import NavBar from "./navBar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }
  function handleSubmit(event) {
    event.preventDefault();
  }
  return (
    <div>
    <NavBar></NavBar>
    <div>
      <Form className="Login" onSubmit={handleSubmit}>
        <Form.Group className="email" size="lg" controlId="email">
          <Form.Label className="email">Email</Form.Label>
          <br></br>
          <Form.Control
            autoFocus
            className="Text"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label className="email">Password</Form.Label>
          <br></br>
          <Form.Control
            className="Text"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
            </div>
    </div>
  );
}