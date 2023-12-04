import React from "react";
import ticketsImage from "./../img/tickets.png";
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HelpQueueHeader = styled.h1`
  font-size: 24px;
  text-align: center;
  color: white;
  background-color: purple;
`;

const StyledWrapper = styled.section`
  background-color: orange;
  padding-bottom: 15px;
`;

function Header() {
  return (
    <StyledWrapper>
      <HelpQueueHeader>
        <h1>Help Queue
          <img src={ticketsImage} alt="A couple of tickets." />
        </h1>
      </HelpQueueHeader>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/sign-in">Sign In</Link>
        </li>
      </ul>
    </StyledWrapper>
  );
}

export default Header;