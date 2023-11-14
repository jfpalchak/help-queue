import React from "react";
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false // our default state: show the tickets, not the form
    };
  }

  handleClick = () => {
    this.setState({formVisibleOnPage: true});
  }

  // Conditional Rendering for our TicketList/NewTicketForm:
  render() {
    let currentlyVisibleState = null;
    let addTicketButton = null;
    if (this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm />
    } else {
      currentlyVisibleState = <TicketList />
      addTicketButton = <button onClick={this.handleClick}>Add Ticket</button>
    }

    return(
      <React.Fragment>
        {currentlyVisibleState}
        {addTicketButton}
      </React.Fragment>
    );
  }
}

export default TicketControl;