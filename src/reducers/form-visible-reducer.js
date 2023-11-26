import { createSlice } from '@reduxjs/toolkit';

// import * as c from './../actions/ActionTypes';

// const reducer = (state = false, action) => {
//   switch(action.type) {
//     case c.TOGGLE_FORM:
//       return !state;
//     default:
//       return state;
//   }
// };


// RTK MIGRATION to createSlice
// We might rename the file formSlice and move it to its own
// feature directory with the appropriate components

// createSlice uses a library called Immer, which uses a JS tool
// called a Proxy to wrap the data we're providing and let us 
// write code that "mutates" that wrapped data. But Immer tracks
// those changes and uses the list of changes to return a safely
// immutably updated value, as if we've written all the immutable update logic by hand.

// We can ONLY write this "mutating" esque logic in RTK's createSlice and createReducer,
// because they're using Immer

const formSlice = createSlice({
  name: 'FORM',
  initialState: { visible: false },
  reducers: {
    formToggled: (state) => {
      state.visible = !state.visible
    }
  }  
});

export const { formToggled } = formSlice.actions;
export default formSlice.reducer;

// export default reducer;

// Anyways, typically it's worth avoiding having our Form state and other local state in the redux Store,
// but hey, we're here to learn. 