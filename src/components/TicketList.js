import React from "react";
import Ticket from "./Ticket";
import PropTypes from "prop-types"; 

function TicketList(props) {
  return (
    <React.Fragment>
      <hr/>
      {props.ticketList.map((ticket) => {
        return <Ticket 
          whenTicketClicked={props.onTicketSelection}
          names={ticket.names}
          location={ticket.location}
          issue={ticket.issue}
          formattedWaitTime={ticket.formattedWaitTime}
          key={ticket.id} // key is required, but we set it to the ticket's ID
          // we can't pass keys as props to child components, so we add an ID prop:
          id={ticket.id}
        />
      })}
    </React.Fragment>
  );
}

TicketList.propTypes = {
  ticketList: PropTypes.array,
  onTicketSelection: PropTypes.func
};

export default TicketList;