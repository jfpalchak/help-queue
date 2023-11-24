import React from "react";
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";
import TicketDetail from "./TicketDetail";
import EditTicketForm from "./EditTicketForm";
import { connect } from "react-redux";
import Ticket from "./Ticket";

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false, // state slice 1: local state (default does not show form)
      mainTicketList: [], // state slice 2: shared state
      selectedTicket: null, // state slice 3: local state (default no ticket is selected)
      editing: false // state slice 4: local state (default no ticket is being edited)
    };
  }  

  // handleClick toggles our state boolean on whether to show the form or not,
  // depending on if a ticket is currently showing or not showing
  handleClick = () => {
    if (this.state.selectedTicket != null) {

      this.setState({
        formVisibleOnPage: false,
        selectedTicket: null,
        editing: false
      });

    } else {

      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage
      }));

    }
  }

  // this method handles the process of adding a new ticket to our mainTicketList state
  // we'll pass this on to our form component as a prop!
  handleAddingNewTicketToList = (newTicket) => {
    // instead of directly altering the array, we make a new _COPY_ of the array,
    // which is what we set the new value of mainTicketList to with setState
    const newMainTicketList = this.state.mainTicketList.concat(newTicket);
    // We also make sure formVisibleOnPage is set to false, so the user can
    // see the list of tickets again, not the form.
    this.setState({mainTicketList: newMainTicketList,
                  formVisibleOnPage: false });
  }

  // this method handles click event on a ticket
  handleChangingSelectedTicket = (id) => {
    // because we're using UUID's now, we know that only one ticket will match the id
    // NOTE: because filter() returns an array, we use bracket notation to specify we want
    // the first (and only element) in the returned array:
    const selectedTicket = this.state.mainTicketList.filter(ticket => ticket.id === id)[0];
    this.setState({selectedTicket: selectedTicket});
  }

  // this method handles deleting a targeted ticket
  handleDeletingTicket = (id) => {
    // filter out the specific ticket when we create a copy of our new list:
    const newMainTicketList = this.state.mainTicketList.filter(ticket => ticket.id !== id);
    this.setState({
      mainTicketList: newMainTicketList,
      selectedTicket: null
    });
  }

  // this method handles the rendering of our edit form
  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({editing: true});
  }

  // this method handles updating our shared state with the updated ticket,
  // as well as updating local state to decide what is rendered to the DOM
  handleEditingTicketInList = (ticketToEdit) => {
    // filter out the OLD version of the ticket we just edited,
    // then concat our NEWly updated version to this filtered list
    const editedMainTicketList = this.state.mainTicketList
      .filter(ticket => ticket.id !== this.state.selectedTicket.id)
      .concat(ticketToEdit);
    this.setState({
      mainTicketList: editedMainTicketList,
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
    else if (this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />;
      buttonText = "Return to Ticket List";
    } else {
      currentlyVisibleState = <TicketList 
                                // we pass the state of our entire ticket list
                                // for TicketList to iterate over and render
                                ticketList={this.state.mainTicketList}
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
TicketControl = connect()(TicketControl);

export default TicketControl;