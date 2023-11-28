import React from "react";
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";
import TicketDetail from "./TicketDetail";
import EditTicketForm from "./EditTicketForm";

import { formatDistanceToNow } from "date-fns";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as a from './../actions';


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

  // TIMER & LIFECYCLE METHODS
  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(() => 
      // the code to be executed
      this.updateTicketElapsedWaitTime(),
      // the delay between each interval
      60000 // every 60 seconds
      );
  }

  componentWillUnmount() {
    clearInterval(this.waitTimeUpdateTimer);
  }

  // calculate how much time has passed since ticket submission
  updateTicketElapsedWaitTime = () => {
    const { dispatch } = this.props;
    // we could use map() here, but our function only has side effects (update store)
    // and map is supposed to return something without side effects,
    // so forEach better communicates our intentions

    // this would not scale well with a larger 
    Object.values(this.props.mainTicketList).forEach(ticket => {
      const newFormattedWaitTime = formatDistanceToNow(ticket.timeOpen, {
        addSuffix: true
      });
      const action = a.updateTime(ticket.id, newFormattedWaitTime);
      dispatch(action);
    })
  }

  // HANDLER METHODS

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
      const action = a.toggleForm();
      dispatch(action);
    }
  }

  // this method handles the process of adding a new ticket to our mainTicketList state
  // we'll pass this on to our form component as a prop!
  handleAddingNewTicketToList = (newTicket) => {
    const { dispatch } = this.props;
    const action = a.addTicket(newTicket);
    dispatch(action);

    const action2 = a.toggleForm();
    dispatch(action2);
  }

  // this method handles click event on a ticket
  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.props.mainTicketList[id];
    this.setState({selectedTicket: selectedTicket});
  }

  // this method handles deleting a targeted ticket
  handleDeletingTicket = (id) => {
    const { dispatch } = this.props;
    const action = a.deleteTicket(id);

    dispatch(action);

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
    const action = a.addTicket(ticketToEdit);

    dispatch(action);

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
    formVisibleOnPage: state.formVisibleOnPage
  }
};

TicketControl = connect(mapStateToProps)(TicketControl);

export default TicketControl;