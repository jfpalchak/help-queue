import React, { useState } from "react";
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";
import TicketDetail from "./TicketDetail";
import EditTicketForm from "./EditTicketForm";

import { connect } from "react-redux";
import PropTypes from "prop-types";
// import * as a from './../actions';
import { ticketAdded, ticketDeleted } from "../reducers/ticket-list-reducer";
import { formToggled } from "../reducers/form-visible-reducer";

// TODO: Refactor to function component, refactor state with redux hooks
class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      // formVisibleOnPage: false, // local state (default does not show form) ! IN REDUX STORE !
      selectedTicket: null, // local state (default no ticket is selected)
      editing: false // local state (default no ticket is being edited)
    };
  }

  // const [selectedTicket, setSelectedTicket] = useState(null);
  // const [editing, setEditing] = useState(false);

  // TIMER to demonstrate lifecycle methods
  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(() => 
      // the code to be executed
      this.updateTicketElapsedWaitTime(),
      // the delay between each interval
      1000
      );
  }

  componentDidUpdate() {
    console.log("Component updated.");
  }

  componentWillUnmount() {
    console.log("Component unmounted.");
    clearInterval(this.waitTimeUpdateTimer);
  }

  updateTicketElapsedWaitTime = () => {
    console.log("Tick");
  }



  // handleClick toggles our state boolean on whether to show the form or not,
  // depending on if a ticket is currently showing or not showing
  handleClick = () => {
    if (this.state.selectedTicket != null) {

      this.setState({
        // formVisibleOnPage: false, // IN REDUX STORE
        selectedTicket: null,
        editing: false
      });

    } else {
      const { dispatch } = this.props;
      // const action = a.toggleForm();
      dispatch(formToggled());
    }
  }

  // this method handles the process of adding a new ticket to our mainTicketList state
  // we'll pass this on to our form component as a prop!
  handleAddingNewTicketToList = (newTicket) => {
    const { dispatch } = this.props;
    // const action = a.addTicket(newTicket);
    dispatch(ticketAdded(newTicket));

    // const action2 = a.toggleForm();
    dispatch(formToggled());
  }

  // this method handles click event on a ticket
  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.props.mainTicketList[id];
    this.setState({selectedTicket: selectedTicket});
  }

  // this method handles deleting a targeted ticket
  handleDeletingTicket = (id) => {
    const { dispatch } = this.props;
    // const action = a.deleteTicket(id);

    dispatch(ticketDeleted(id));

    this.setState({
      selectedTicket: null
    });
  }

  // this method handles the rendering of our edit form
  handleEditClick = () => {
    this.setState({editing: true});
  }

  // this method handles updating our shared state with the updated ticket,
  // as well as updating local state to decide what is rendered to the DOM
  handleEditingTicketInList = (ticketToEdit) => {
    
    const { dispatch } = this.props;
    // const action = a.addTicket(ticketToEdit);

    dispatch(ticketAdded(ticketToEdit));

    this.setState({
      editing: false,
      selectedTicket: null
    });
  }

  // Conditional Rendering for TicketList/NewTicketForm/TicketDetail/EditTicketForm:
  render() {
    let currentlyVisibleState = null;
    let buttonText = null;

    if (this.state.editing) {
      currentlyVisibleState= <EditTicketForm 
                                ticket={this.state.selectedTicket} 
                                onEditClick={this.handleEditingTicketInList}
                              />
      buttonText = "Return to Ticket List";
    }
    else if (this.state.selectedTicket != null) {
      currentlyVisibleState = <TicketDetail 
                                ticket={this.state.selectedTicket} 
                                onClickingDelete={this.handleDeletingTicket}
                                onClickingEdit={this.handleEditClick}
                              />;
      buttonText = "Return to Ticket List";
    }
      else if (this.props.formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />;
      buttonText = "Return to Ticket List";
    } else {
      currentlyVisibleState = <TicketList 
                                ticketList={this.props.mainTicketList}
                                onTicketSelection={this.handleChangingSelectedTicket} 
                              />;
      buttonText = "Add Ticket";
    }

    return(
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
}

TicketControl.propTypes = {
  mainTicketList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    mainTicketList: state.mainTicketList,
    formVisibleOnPage: state.formVisibleOnPage.visible // we refactored our reducers initial state to be an object
  }
};

// TO REFACTOR OUR CONNECT & MIGRATE TO HOOKS:
// each individual field in mapState will become a separate useSelector call

TicketControl = connect(mapStateToProps)(TicketControl);

export default TicketControl;