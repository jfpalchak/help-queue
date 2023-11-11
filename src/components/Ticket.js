import React from "react";
import PropTypes from "prop-types";

// Remember, JSX JavaScript expressions must always be wrapped in curly braces.
// Content inside {} will be evaluated instead of literally rendered.
function Ticket(props) {
  return (
    <React.Fragment>
      <h3>{props.location} - {props.names}</h3>
      <p><em>{props.issue}</em></p>
      <hr/>
    </React.Fragment>
  );
}

Ticket.propTypes = {
  names: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  issue: PropTypes.string
};

export default Ticket;