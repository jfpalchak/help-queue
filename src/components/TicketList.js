import React from "react";
import Ticket from "./Ticket";

// We'll pass props down to a child component using JSX tags.
// It's common to put each prop on a separate line, and while not required,
// it does make it easier to read what's being passed down to the child components
function TicketList() {
  return (
    <React.Fragment>
      <Ticket
        location="3A"
        names="Thato and Haley"
        issue="Firebase will not save records!"
      />
      <Ticket 
        location="4B"
        names="Sleater and Kinney"
        issue="Prop types are throwing an error."
      />
    </React.Fragment>
  );
}

export default TicketList;