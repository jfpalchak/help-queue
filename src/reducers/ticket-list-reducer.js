import { createSlice } from '@reduxjs/toolkit';

// import * as c from './../actions/ActionTypes';

// // Our reducer is a pure function, 
// // not concerned about storing state, or mutating state.
// // It is only responsible for handling specific actions.

// const reducer = (state = {}, action) => {
//   const { names, location, issue, id } = action;

//   switch(action.type) {
//     case c.ADD_TICKET:
//       // We clone the given state object, add a new ticket to the clone,
//       // and we return that altered clone of the state object.
//       return Object.assign({}, state, {
//         [id] : {
//           names: names,
//           location: location,
//           issue: issue,
//           id: id
//         }
//       });
//     case c.DELETE_TICKET:
//       let newState = { ...state };
//       delete newState[id];
//       return newState;
//     default:
//         return state;
//   }
// };

// RTK MIGRATION to createSlice
// We might rename the file formSlice and move it to its own
// feature directory with the appropriate components

// - createSlice eliminates the hand-written action creators and action types ENTIRELY
// - The uniquely named action.names and action.id fields are replaced by action.payload,
// either as individual value or an object containing multiple values
// --> Which means we don't need separate files for actions & reducers.
// - NAMING: Ideally, reducers and actions should use the past tense and describe
// "a thing that happened," ie, ticketAdded instead of ADD_TICKET

const ticketListSlice = createSlice({
  name: 'TICKETS',
  initialState: {},
  reducers: {
    ticketAdded(state, action) {
      const ticket = action.payload;
      state[ticket.id] = ticket;
    },
    ticketDeleted(state, action) {
      const ticketId = action.payload;
      delete state[ticketId];
    }
  }
});

// When we call dispatch(ticketAdded(newTicket)), whatever values / objects
// we pass as an argument will be used as the action.payload.
// ALTERNATIVELY: We can use the "prepare" notation inside a createSlice reducer
// to accept multiple separate arguments and create the payload field.
// --> That could be useful for cases where the action creators are doing additional work
// like generating unique IDs for each item.

export const { ticketAdded, ticketDeleted } = ticketListSlice.actions;

export default ticketListSlice.reducer;

// export default reducer;