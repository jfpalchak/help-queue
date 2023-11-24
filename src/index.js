import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
// Redux Imports:
import { legacy_createStore as createStore } from 'redux';
import reducer from './reducers/ticket-list-reducer';
import { Provider } from 'react-redux';


const store = createStore(reducer);

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