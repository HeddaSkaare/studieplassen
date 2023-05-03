import { useReactiveVar } from "@apollo/client";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { poiId, poiName } from "./markers";
import NavBar from "./navBar";

export default function AddPlace() {
    const Id = useReactiveVar(poiId);
    const name = useReactiveVar(poiName);
    const [noice, setNoice] = useState(3);
    const [rating, setRating] = useState(3);
    const [cardEntrance, setCardEntrance] = useState(false);
    const [capasity, setCapasity] = useState(3);
    const navigate = useNavigate();

    const [noiceT,setNoiceT]=useState("Middels")
    const [ratingT,setRaintingT]=useState("Ok")
    const noiceArray = ["Helt stille","Litt stille","Middels","Litt støy", "Støy"]
    const raitingArray = ["Dårlig","Litt dårlig","Ok","Bra", "Svært bra"]

    function validateForm() {
        return noice.length > 0 && rating <= 10 && rating >= 1;
    }
   
    function handleSubmit(event) {
        event.preventDefault();
        const poiId = Id;
        const StoyNiva = noice;
        const Vurdering = rating;
        const Korttilgang = cardEntrance;
        const kapasitet = capasity;
        fetch("http://localhost:3000/addplace", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                poiId,
                StoyNiva,
                Vurdering,
                Korttilgang,
                kapasitet
            })
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error(error));
        navigate("/");
    }
    function handleNoiceChange(event) {
        event.preventDefault();
        setNoice(event.target.value);
        var i = event.target.value 
        setNoiceT(noiceArray[i-1])
    }
    function handleRatingChange(event) {
        event.preventDefault();
        setRating(event.target.value);
         var i = event.target.value 
        setRaintingT(raitingArray[i-1])
    }
    function handleCapasityChange(event) {
        event.preventDefault();
        setCapasity(event.target.value);
    }
    function handleClick() {
        setCardEntrance(!cardEntrance);
    }
   
    
    return (
        <div>
            <NavBar />
            <div>
                <header className="header">
                    <h1>Legg Til Info til {name} </h1>
                </header>
                <Form className="box" onSubmit={handleSubmit}>
                    <Form.Group className="boxElement" size="lg" controlId="email" >
                        <Form.Label className="label">Lydnivå:</Form.Label>
                        <br></br>
                        <input
                            className="slider"
                            type="range"
                            min={1}
                            max={5}
                            value={noice}
                            onChange={handleNoiceChange}
                        />
                        <p>{noiceT}</p>
                    </Form.Group>
                    
                    <Form.Group className="boxElement" size="lg" controlId="email">
                        <Form.Label className="label">Krever korttilgang</Form.Label>
                        <br></br>
                        <Button className="button" onClick={handleClick}>
                            {cardEntrance ? "Ja" : "Nei"}
                        </Button>
                    </Form.Group>
                    <Form.Group className="boxElement" size="lg" controlId="email">
                        <Form.Label className="label">Kapasitet:</Form.Label>
                        <br></br>
                        <input
                            className="slider"
                            type="range"
                            min={1}
                            max={10}
                            value={capasity}
                            onChange={handleCapasityChange}
                            
                        />
                        <p>Rundt {capasity*10} plasser</p>
                    </Form.Group>
                    <Form.Group className="boxElement" size="lg" controlId="email">
                        <Form.Label className="label">Helhetsinntrykk:</Form.Label>
                        <br></br>
                        <input
                            className="slider"
                            type="range"
                            min={1}
                            max={5}
                            value={rating}
                            onChange={handleRatingChange}
                        />
                        <p>{ratingT} </p>

                    </Form.Group>
                    <Button
                        className="button"
                        id="addForm"
                        block
                        size="lg"
                        type="submit"
                        disabled={!validateForm()}                    >
                        Legg Til
                    </Button>
                </Form>
            </div>
        </div>
    );
}
