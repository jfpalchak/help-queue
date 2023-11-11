import React from "react";
import Ticket from "./Ticket";

const mainTicketList = [
  {
    names: "Thato and Haley",
    location: "3A",
    issue: "Firebase won't save records. Help."
  },
  {
    names: "Sleater and Kinney",
    location: "4B",
    issue: "Prop types are throwing an error."
  },
  {
    names: "Imani & Jacob",
    location: "9F",
    issue: "Child component isn't rendering."
  }
];

// We'll use map to loop through our list of tickets.
// On each iteration, it will create a new Ticket with props
// that correspond to a ticket in the mainTicketList

// We also add a key value to each ticket, corresponding to its index.
// If we don't do this, we'll get an error:
// "Warning: Each child in an array or iterator should have a unique 'key' prop."

// Having unique keys helps React differentiate between similar components,
// so it can identify which have been updated, added, or removed from the list
// during its virtual DOM reconciliation.
function TicketList() {
  return (
    <React.Fragment>
      {mainTicketList.map((ticket, index) => 
        <Ticket 
          names={ticket.names}
          location={ticket.location}
          issue={ticket.issue}
          key={index}
        />
      )}
    </React.Fragment>
  );
}

export default TicketList;