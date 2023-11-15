import React from "react";
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false, // state slice 1: local state (default does not show form)
      mainTicketList: [], // state slice 2: shared state
      selectedTicket: null // state slice 3: local state (default no ticket is selected)
    };
  }  

  // handleClick toggles our state boolean on whether to show the form or not:
  handleClick = () => {
    this.setState(prevState => ({
      // We pass in the current state of the formVisibleOnPage boolean to prevState. 
      // Now that we know this value, 
      // we can say the new state should be !prevState.formVisibleOnPage (the opposite of the old state).
      formVisibleOnPage: !prevState.formVisibleOnPage
    }));
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

  // Conditional Rendering for our TicketList/NewTicketForm:
  render() {
    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />;
      buttonText = "Return to Ticket List";
    } else {
      currentlyVisibleState = <TicketList ticketList={this.state.mainTicketList} />;
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

export default TicketControl;