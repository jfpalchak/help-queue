import React, { useState } from "react";
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";
import TicketDetail from "./TicketDetail";
import EditTicketForm from "./EditTicketForm";

function TicketControl() {

  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);

  // handleClick toggles our state boolean on whether to show the form or not,
  // depending on if a ticket is currently showing or not showing
  const handleClick = () => {
    if (this.state.selectedTicket != null) {

      setFormVisibleOnPage(false);

      this.setState({
        // formVisibleOnPage: false,
        selectedTicket: null,
        editing: false
      });

    } else {

      setFormVisibleOnPage(!formVisibleOnPage);

    }
  }


  const handleAddingNewTicketToList = (newTicket) => {

    const newMainTicketList = this.state.mainTicketList.concat(newTicket);

    this.setState({mainTicketList: newMainTicketList});

    setFormVisibleOnPage(false);
  }

  // this method handles click event on a ticket
  const handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.state.mainTicketList.filter(ticket => ticket.id === id)[0];
    this.setState({selectedTicket: selectedTicket});
  }

  // this method handles deleting a targeted ticket
  const handleDeletingTicket = (id) => {
    // filter out the specific ticket when we create a copy of our new list:
    const newMainTicketList = this.state.mainTicketList.filter(ticket => ticket.id !== id);
    this.setState({
      mainTicketList: newMainTicketList,
      selectedTicket: null
    });
  }

  // this method handles the rendering of our edit form
  const handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({editing: true});
  }

  // this method handles updating our shared state with the updated ticket,
  // as well as updating local state to decide what is rendered to the DOM
  const handleEditingTicketInList = (ticketToEdit) => {
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

  // Conditional Rendering:
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
  else if (formVisibleOnPage) {
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

export default TicketControl;