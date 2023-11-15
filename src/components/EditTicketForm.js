import React from "react";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";

function EditTicketForm(props) {
  return (
    <React.Fragment>
      <ReusableForm 
        buttonText="Update Ticket"
      />
    </React.Fragment>
  );
}

EditTicketForm.propTypes = {
  ticket: PropTypes.object
};

export default EditTicketForm;