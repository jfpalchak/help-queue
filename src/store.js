import { configureStore } from '@reduxjs/toolkit';

import formVisibleReducer from './reducers/form-visible-reducer';
import ticketListReducer from './reducers/ticket-list-reducer';

const store = configureStore({
  reducer: {
    mainTicketList: ticketListReducer,
    formVisibleOnPage: formVisibleReducer
  }
});

export default store;

// We've simplified the store setup process:
// It combined our two reducers into one root reducer,
// and created our Redux store using that root reducer.
// Common middleware has been automatically added for us as well,
// like thunk middleware and checking accidental state mutations.
// (Also set up Redux DevTools connection)