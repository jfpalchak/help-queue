import React from "react";
import ticketsImage from "./../img/tickets.png";

// We separate our header into its own component;
// After all, it has nothing to do with tickets, or a button for a form.
// And in the future, if we need to add more to our header,
// it's already nicely separated!

// Note that we don't need to wrap our JSX in <React.Fragment>
// That's because our component is only returning _one_ element.
function Header() {
  return (
    <React.Fragment>
      <h1>Help Queue
      <img src={ticketsImage} alt="A couple of tickets." />
      </h1>
    </React.Fragment>
  );
}

export default Header;