import React from "react";
import PropTypes from "prop-types";
import { v4 } from "uuid";
import ReusableForm from "./ReusableForm";

function NewTicketForm(props) {

  // this method handles the Submit event for our form:
  function handleNewTicketFormSubmission(event) {
    event.preventDefault();
    // we utilize the method we passed through as a prop
    // to update the parent's state with our new ticket
    props.onNewTicketCreation({
      names: event.target.names.value,
      location: event.target.location.value,
      issue: event.target.issue.value,
      id: v4() // we create a unique id with the UUID library
    });
  }

  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={handleNewTicketFormSubmission}
        buttonText="Help!"
      />
    </React.Fragment>
  );
}

NewTicketForm.propTypes = {
  // we passed down this.handleAddingNewTicketToList as the prop called onNewTicketCreation:
  onNewTicketCreation: PropTypes.func
};

export default NewTicketForm;