import React from "react";

// Remember, JSX JavaScript expressions must always be wrapped in curly braces.
// Conent inside {} will be evaluated instead of literally rendered.
function Ticket(props) {
  return (
    <React.Fragment>
      <h3>{props.location} - {props.names}</h3>
      <p><em>{props.issue}</em></p>
      <hr/>
    </React.Fragment>
  );
}

export default Ticket;