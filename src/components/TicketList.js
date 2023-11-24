import React from "react";
import Ticket from "./Ticket";
import PropTypes from "prop-types"; 

function TicketList(props) {
  return (
    <React.Fragment>
      <hr/>
      {/* Now we need to map over the values of an object, not an array: */}
      {Object.values(props.ticketList).map((ticket) => 
        <Ticket 
          whenTicketClicked={props.onTicketSelection}
          names={ticket.names}
          location={ticket.location}
          issue={ticket.issue}
          key={ticket.id} // key is required, but we set it to the ticket's ID
          // we can't pass keys as props to child components, so we add an ID prop:
          id={ticket.id}
        />
      )}
    </React.Fragment>
  );
}

TicketList.propTypes = {
  // The PropType for ticketList is now an object:
  ticketList: PropTypes.object,
  onTicketSelection: PropTypes.func // specify prop type for the event handler prop
};

export default TicketList;