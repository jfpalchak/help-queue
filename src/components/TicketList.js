import React from "react";
import Ticket from "./Ticket";
import PropTypes from "prop-types"; 

function TicketList(props) {
  return (
    <React.Fragment>
      <hr/>
      {/* we'll loop through our ticketList prop passed down from TicketControl */}
      {props.ticketList.map((ticket) => 
        <Ticket 
          // we pass our event handler as a prop to each ticket,
          // because the TICKET will handle determining whether it has been clicked.
          // note that this prop is separate from a ticket's properties!
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
  ticketList: PropTypes.array,
  onTicketSelection: PropTypes.func // specify prop type for the event handler prop
};

export default TicketList;