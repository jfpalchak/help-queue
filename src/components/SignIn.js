import React from "react";

function SignIn() {

  const doSignUp = (e) => {
    e.preventDefault();
  }

  return (
    <> 
      <h1>Sign In</h1>
      <form onSubmit={doSignUp}>
        <input 
          type="text"
          name="email"
          placeholder="Email" />
        <input 
          type="password"
          name="password"
          placeholder="Password" />
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignIn;