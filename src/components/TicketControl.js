import React, { useState, useEffect } from "react";
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";
import TicketDetail from "./TicketDetail";
import EditTicketForm from "./EditTicketForm";
import { formatDistanceToNow } from "date-fns";
import { db, auth } from "./../firebase";
import { 
  collection, 
  addDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';

function TicketControl() {

  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainTicketList, setMainTicketList] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);

  // we establish our Firestore database listener,
  // with a hook that runs only on first render
  // any time our database collection of tickets is updated,
  // we'll update our mainTicketList
  useEffect(() => {
    // create a Firestore query to order our 
    // tickets by Creation Timestamp:
    const queryByTimestamp = query(
      collection(db, 'tickets'),
      orderBy('timeOpen', 'desc')
    );
    const unSubscribe = onSnapshot(
      queryByTimestamp, // pass in our query
      (querySnapshot) => {
        const tickets = querySnapshot.docs.map((doc) => {
          // turn the Firestore server timestamp into a JS Date object:
          // get the value of the timeOpen field of the current document,
          // then, call the Timestamp.toDate() method on the returned Firestore Timestamp object,
          // and turn it into data that's formatted for JavaScript
          const timeOpen = doc.get('timeOpen', {serverTimestamps: "estimate"}).toDate();
          const jsDate = new Date(timeOpen);

          return {
            // could also use spread operator, ie:
            // ...doc.data(),
            names: doc.data().names,
            location: doc.data().location,
            issue: doc.data().issue,
            timeOpen: jsDate,
            formattedWaitTime: formatDistanceToNow(jsDate),
            id: doc.id
          };
        });
        setMainTicketList(tickets);
      },
      (error) => {
        // a Firestore error is returned as a FirestoreError object,
        // which has a message property with a description of the error that occurred
        // SO, if an error DOES occur:
        setError(error.message);
      }
    );
    // we return a cleanup function that will unsubscribe from our listener
    // when TicketControl unmounts
    return () => unSubscribe();
  }, []);

  useEffect(() => {
    function updateTicketElapsedWaitTime() {
      const newMainTicketList = mainTicketList.map(ticket => {
        const newFormattedWaitTime = formatDistanceToNow(ticket.timeOpen);
        return {...ticket, formattedWaitTime: newFormattedWaitTime};
      });
      setMainTicketList(newMainTicketList);
    }

    const waitTimeInterval = setInterval(() =>
      updateTicketElapsedWaitTime(),
      60000
    );

    return () => clearInterval(waitTimeInterval);
  }, [mainTicketList]);


  // handleClick toggles our state boolean on whether to show the form or not,
  // depending on if a ticket is currently showing or not showing
  const handleClick = () => {
    if (selectedTicket != null) {
      setFormVisibleOnPage(false);
      setSelectedTicket(null);
      setEditing(false);
    } else {
      setFormVisibleOnPage(!formVisibleOnPage);
    }
  }

  const handleAddingNewTicketToList = async (newTicketData) => {

    // we asynchronously add a new ticket document to our tickets collection
    // collection() creates a CollectionReference object: 
    // firestore looks to see if this collection exists, 
    // and if it does not, simply creates one
    // the second argument is the data we're adding to our database,
    // which must always be a JavaScript object
    await addDoc(collection(db, "tickets"), newTicketData);

    setFormVisibleOnPage(false);
  }

  const handleChangingSelectedTicket = (id) => {
    const selection = mainTicketList.filter(ticket => ticket.id === id)[0];
    setSelectedTicket(selection);
  }

  const handleDeletingTicket = async (id) => {
    
    await deleteDoc(doc(db, 'tickets', id));

    setSelectedTicket(null);
  }

  // this method handles the rendering of our edit form
  const handleEditClick = () => {
    setEditing(true);
  }

  // this method handles updating our database with the updated ticket,
  // as well as updating local state to decide what is rendered to the DOM
  const handleEditingTicketInList = async (ticketToEdit) => {
    const ticketRef = doc(db, 'tickets', ticketToEdit.id);
    await updateDoc(ticketRef, ticketToEdit);

    setEditing(false);
    setSelectedTicket(null);
  }

  // Conditional Rendering:
  // IF USER IS NOT LOGGED IN:
  if (auth.currentUser == null) {
    return (
      <>
        <h1>You must be signed in to access the queue.</h1>
      </>
    );

  // IF USER IS LOGGED IN:
  } else if (auth.currentUser != null) {
    let currentlyVisibleState = null;
    let buttonText = null;

    if (error) {
      currentlyVisibleState = <p>There was an error: {error}</p>;
    } else if (editing) {
      currentlyVisibleState= 
        <EditTicketForm 
          ticket={selectedTicket} 
          onEditClick={handleEditingTicketInList}
        />
      buttonText = "Return to Ticket List";
    } else if (selectedTicket != null) {
      currentlyVisibleState = 
        <TicketDetail 
          ticket={selectedTicket} 
          onClickingDelete={handleDeletingTicket}
          onClickingEdit={handleEditClick}
        />;
      buttonText = "Return to Ticket List";
    } else if (formVisibleOnPage) {
      currentlyVisibleState = 
        <NewTicketForm 
          onNewTicketCreation={handleAddingNewTicketToList} 
        />;
      buttonText = "Return to Ticket List";
    } else {
      currentlyVisibleState = 
        <TicketList 
          ticketList={mainTicketList}
          onTicketSelection={handleChangingSelectedTicket} 
        />;
      buttonText = "Add Ticket";
    }

    return(
      <React.Fragment>
        {currentlyVisibleState}
        {error ? null : <button onClick={handleClick}>{buttonText}</button>}
      </React.Fragment>
    );
  }
}

export default TicketControl;