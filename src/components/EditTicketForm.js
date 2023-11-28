import React from "react";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";

function EditTicketForm(props) {

  const { ticket } = props;

  // function captures the form values on the form submit event,
  // and simultaneously triggers the handleEditingTicketInList method from TicketControl
  function handleEditTicketFormSubmission(event) {
    event.preventDefault();
    // utilize the event handler method passed in as a prop:
    props.onEditClick({
      names: event.target.names.value,
      location: event.target.location.value,
      issue: event.target.issue.value,
      timeOpen: ticket.timeOpen,
      formattedWaitTime: ticket.formattedWaitTime,
      id: ticket.id
    });
  }

  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={handleEditTicketFormSubmission}
        buttonText="Update Ticket"
      />
    </React.Fragment>
  );
}

EditTicketForm.propTypes = {
  ticket: PropTypes.object,
  onEditClick: PropTypes.func
};

export default EditTicketForm;