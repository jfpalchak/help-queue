import React from "react";
import PropTypes from "prop-types";
import { v4 } from "uuid";
import ReusableForm from "./ReusableForm";
import { formatDistanceToNow } from 'date-fns';

function NewTicketForm(props) {

  function handleNewTicketFormSubmission(event) {
    event.preventDefault();

    props.onNewTicketCreation({
      names: event.target.names.value,
      location: event.target.location.value,
      issue: event.target.issue.value,
      timeOpen: new Date(),
      formattedWaitTime: formatDistanceToNow(new Date(), { addSuffix: true }),
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