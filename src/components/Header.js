import React from "react";

// We separate our header into its own component;
// After all, it has nothing to do with tickets, or a button for a form.
// And in the future, if we need to add more to our header,
// it's already nicely separated!
function Header() {
  return (
    // Note that we don't need to wrap our JSX in <React.Fragment>
    // That's because our component is only returning _one_ element.
    <h1>Help Queue</h1>
  );
}

export default Header;