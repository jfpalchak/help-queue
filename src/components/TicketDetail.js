import React from "react";
import PropTypes from "prop-types";

function TicketDetail(props) {

  // We use object destructuring to derive both the ticket object
  // and the onClickingDelete method from our props:
  // if we didn't, we'd need to say 'props.ticket.location',
  // instead of just 'ticket.location'
  // the ticket prop passed down from TicketControl is an object containing an object!
  const { ticket, onClickingDelete } = props;

  return (
    <React.Fragment>
      <h1>Ticket Detail</h1>
      <h3>{ticket.location} - {ticket.names}</h3>
      <p><em>{ticket.issue}</em></p>

      <button onClick={() => onClickingDelete(ticket.id)}>Close Ticket</button>

      <hr/>
    </React.Fragment>
  );
}

TicketDetail.propTypes = {
  ticket: PropTypes.object,
  onClickingDelete: PropTypes.func
};


export default TicketDetail;