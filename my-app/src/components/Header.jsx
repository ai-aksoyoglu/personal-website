import React from "react";

const date = new Date();
const currentTime = date.getHours();

let greeting;

const customStyle = {
  color: "grey",
};

if (currentTime < 12) {
  greeting = "Good Morning";
  customStyle.color = "red";
} else if (currentTime < 18) {
  greeting = "Good Afternoon";
  customStyle.color = "green";
} else {
  greeting = "Good Night";
  customStyle.color = "blue";
}

function Header() {
  return (
    <header>
      <h1 className="heading" style={customStyle}>
        {greeting}
      </h1>
    </header>
  );
}

export default Header;
