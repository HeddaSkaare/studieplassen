import React, { useState } from 'react';

function Slider(props) {
  const [position, setPosition] = useState(50);

  function handleSliderChange(event) {
    setPosition(event.target.value);
    props.onChange(event.target.value);
  }

  return (
    <div>
        <h5>Vekt:</h5>
      <input type="range" min={props.min} max={props.max} value={position} onChange={handleSliderChange} />
      <p>Value: {position}</p>
    </div>
  );
}

export default Slider;
//<p>Value: {position}</p>