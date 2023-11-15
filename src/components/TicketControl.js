import React from "react";
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false, // our default state: show the tickets, not the form
      mainTicketList: []
    };
  }

  // handleClick toggles our state boolean:
  handleClick = () => {
    this.setState(prevState => ({
      // We pass in the current state of the formVisibleOnPage boolean to prevState. 
      // Now that we know this value, 
      // we can say the new state should be !prevState.formVisibleOnPage (the opposite of the old state).
      formVisibleOnPage: !prevState.formVisibleOnPage
    }));
  }

  // Conditional Rendering for our TicketList/NewTicketForm:
  render() {
    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm />;
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