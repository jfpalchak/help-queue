import React from "react";
import ticketsImage from "./../img/tickets.png";
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>Help Queue
        <img src={ticketsImage} alt="A couple of tickets." />
      </h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/sign-in">Sign In</Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;