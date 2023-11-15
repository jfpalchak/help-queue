import React from "react";

function TicketDetail(props) {

  // We use object destructuring to derive the ticket object
  // from our props:
  // if we didn't, we'd need to say 'props.ticket.location',
  // instead of just 'ticket.location'
  // the ticket prop passed down from TicketControl is an object containing an object!
  const { ticket } = props;

  return (
    <React.Fragment>
      <h1>Ticket Detail</h1>
      <h3>{ticket.location} - {ticket.names}</h3>
      <p><em>{ticket.issue}</em></p>
      <hr/>
    </React.Fragment>
  );
}

TicketDetail.propTypes = {
  ticket: PropTypes.object
};


export default TicketDetail;