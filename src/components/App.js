import React from "react";
import Header from "./Header";
import TicketControl from "./TicketControl";
import { createPortal } from "react-dom";

function App() {
  return (
    <React.Fragment>
      <Header />
      <TicketControl />
    </React.Fragment>
  );
}

export default App;