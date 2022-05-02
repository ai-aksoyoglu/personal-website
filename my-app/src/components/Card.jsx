import React from "react";

function Card(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <img className="img" alt={props.alt} src={props.img} />
    </div>
  );
}

export default Card;
