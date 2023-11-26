import React from "react";
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";
import TicketDetail from "./TicketDetail";
import EditTicketForm from "./EditTicketForm";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as a from './../actions';


class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      // formVisibleOnPage: false, // local state (default does not show form) ! NOW IN REDUX STORE !
      selectedTicket: null, // local state (default no ticket is selected)
      editing: false // local state (default no ticket is being edited)
    };
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
      // const action = {
      //   type: 'TOGGLE_FORM'
      // };
      // ^ REFACTOR with Action Creator:
      const action = a.toggleForm();
      dispatch(action);

      // ^ REFACTOR with Redux, from:
      // this.setState(prevState => ({
      //   formVisibleOnPage: !prevState.formVisibleOnPage
      // }));

    }
  }

  // this method handles the process of adding a new ticket to our mainTicketList state
  // we'll pass this on to our form component as a prop!
  handleAddingNewTicketToList = (newTicket) => {
    const { dispatch } = this.props;
    // const { id, names, location, issue } = newTicket;
    // const action = {
    //   type: 'ADD_TICKET',
    //   id: id,
    //   names: names,
    //   location: location,
    //   issue: issue
    // };
    // ^ REFACTOR with Action Creator:
    const action = a.addTicket(newTicket);

    // We dispatch our action and update the store:
    dispatch(action);

    // const action2 = {
    //   type: 'TOGGLE_FORM'
    // };
    // ^ REFACTOR with Action Creator:
    const action2 = a.toggleForm();

    dispatch(action2);

    // ^ REDUX REFACTOR, from:
    // In a larger application, too much local state cluttering up the Redux store
    // could become a code smell -> and because it's not entirely necessary,
    // we'll keep managing the local state here with this component method.
    
    // Just kidding -> we're learning so we'll make a reducer to play with.

    // this.setState({
    //   formVisibleOnPage: false
    // });

    // const newMainTicketList = this.state.mainTicketList.concat(newTicket);
    // this.setState({mainTicketList: newMainTicketList,
    //               formVisibleOnPage: false });
  }

  // this method handles click event on a ticket
  handleChangingSelectedTicket = (id) => {
    // mainTicketList is no longer a part of this.state, but instead the Redux store:
    // Now we need to pass it into the component via this.props.
    // Also, mainTicketList is an _object_ now, not an array:
    // we can bypass filter and just use bracket notation instead.
    const selectedTicket = this.props.mainTicketList[id];
    this.setState({selectedTicket: selectedTicket});

    // REDUX REFACTOR, from:
    // const selectedTicket = this.state.mainTicketList.filter(ticket => ticket.id === id)[0];
    // this.setState({selectedTicket: selectedTicket});
  }

  // this method handles deleting a targeted ticket
  handleDeletingTicket = (id) => {
    const { dispatch } = this.props;
    // const action = {
    //   type: 'DELETE_TICKET',
    //   id: id
    // };
    // REFACTOR with Action Creator:
    const action = a.deleteTicket(id);

    dispatch(action);

    this.setState({
      selectedTicket: null
    });
    
    // REDUX REFACTOR, from:
    // const newMainTicketList = this.state.mainTicketList.filter(ticket => ticket.id !== id);
    // this.setState({
    //   mainTicketList: newMainTicketList,
    //   selectedTicket: null
    // });
  }

  // this method handles the rendering of our edit form
  handleEditClick = () => {
    this.setState({editing: true});
  }

  // this method handles updating our shared state with the updated ticket,
  // as well as updating local state to decide what is rendered to the DOM
  handleEditingTicketInList = (ticketToEdit) => {
    
    const { dispatch } = this.props;
    // const { id, names, location, issue } = ticketToEdit;
    // const action = {
    //   // NOTE: We use ADD_TICKET to edit our ticket as well.
    //   // The only difference between adding or editing a ticket is the id property:
    //   // If it's a new id, a new ticket is added to the store.
    //   // If it's an id that already exists, that existing ticket is replaced.
    //   // It might be more accurate to rename this action 'ADD_OR_UPDATE_TICKET'.
    //   type: 'ADD_TICKET',
    //   id: id,
    //   names: names,
    //   location: location,
    //   issue: issue
    // };
    // REFACTOR with Action Creator:
    const action = a.addTicket(ticketToEdit);

    dispatch(action);

    this.setState({
      editing: false,
      selectedTicket: null
    });

    // REDUX REFACTOR, from:
    // const editedMainTicketList = this.state.mainTicketList
    //   .filter(ticket => ticket.id !== this.state.selectedTicket.id)
    //   .concat(ticketToEdit);
    // this.setState({
    //   mainTicketList: editedMainTicketList,
    //   editing: false,
    //   selectedTicket: null
    // });
    
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
    // else if (this.state.formVisibleOnPage) {
      else if (this.props.formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />;
      buttonText = "Return to Ticket List";
    } else {
      currentlyVisibleState = <TicketList 
                                // we pass the state of our entire ticket list
                                // for TicketList to iterate over and render
                                // REDUX REFACTOR, from this.state to this.props:
                                ticketList={this.props.mainTicketList}
                                // we pass our event handler as a prop,
                                // which we'll again pass to each individual ticket
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

// NOTE:
// Because our goal is to keep things simple, we'll add the connect() function
// to the one component in our application that already has state: TicketControl
// This way, we'll mostly only need to update the one component to integrate Redux in
// our application. 

// We'll wrap our TicketControl component with the connect() function to add new functionality:
// The return value of connect() is the TicketControl component itself,
// but now with dispatch() and mapStateToProps()

// Because we are mapping state from the Redux store to our component's props
// with mapStateToProps, we need to add prop types to our component:
TicketControl.propTypes = {
  mainTicketList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    mainTicketList: state.mainTicketList,
    formVisibleOnPage: state.formVisibleOnPage
    // this will always have the format of:
    // key-value pair of state to be mapped from Redux to React component
  }
};

// We pass our defined mapStateToProps function into the connect() function:
TicketControl = connect(mapStateToProps)(TicketControl);

export default TicketControl;