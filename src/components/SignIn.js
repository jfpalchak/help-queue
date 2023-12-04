import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth';

function SignIn() {

  const [signUpSuccess, setSignUpSuccess] = useState(null);

  const doSignUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSignUpSuccess(`You've successfully signed up, ${userCredential.user.email}!`);
      })
      .catch((error) => {
        setSignUpSuccess(`There was an error signing up: ${error.message}!`);
      });
  }

  return (
    <> 
      <h1>Sign In</h1>
      {signUpSuccess}
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