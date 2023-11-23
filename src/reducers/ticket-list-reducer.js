// Our reducer is a pure function, 
// not concerned about storing state, or mutating state.
// It is only responsible for handling specific actions.

const reducer = (state = {}, action) => {
  const { names, location, issue, id } = action;

  switch(action.type) {
    case 'ADD_TICKET':
      // We clone the given state object, add a new ticket to the clone,
      // and we return that altered clone of the state object.
      return Object.assign({}, state, {
        [id] : {
          names: names,
          location: location,
          issue: issue,
          id: id
        }
      });
    default:
        return state;
  }
};

export default reducer;