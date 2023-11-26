import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
// import { legacy_createStore as createStore } from 'redux';
// import reducer from './reducers/ticket-list-reducer';
// import rootReducer from './reducers/index';
import { Provider } from 'react-redux';
// NOTE: Redux Toolkit ALREADY INCLUDES the package for redux, redux-thunk, and reselect
// We could clean up our project and remove those packages listed in our package.json.

// We might separate the store creation into its own file
import { configureStore } from '@reduxjs/toolkit';
import formVisibleReducer from './reducers/form-visible-reducer';
import ticketListReducer from './reducers/ticket-list-reducer';

const store = configureStore({
  reducer: {
    mainTicketList: ticketListReducer,
    formVisibleOnPage: formVisibleReducer
  }
})

// const store = createStore(rootReducer);

// For dev purposes:
store.subscribe( () => 
  console.log(store.getState())
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* We'll pass the Redux store as a prop to Provider,
    so App and all its children components will inherit it.
    We won't need to explicitly pass store as a prop through the other components,
    because of this inheritance by way of the <Provider> component. */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();