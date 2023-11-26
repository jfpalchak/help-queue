import React from "react";
import ticketsImage from "./../img/tickets.png";

function Header() {
  return (
      <h1>Help Queue
        <img src={ticketsImage} alt="A couple of tickets." />
      </h1>
  );
}

export default Header;