import React, { useState } from "react"; 
import { auth, provider } from "../firebase.js";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import "../styles/Auth.css"; // Make sure this CSS file exists
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const Auth = ({ setIsAuth }) => {
  // Separate state variables for sign-in and sign-up
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error("Error during Google sign-in:", err.message);
      setErrorMessage("Error during Google sign-in.");
    }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault(); 
    try {
      const result = await signInWithEmailAndPassword(auth, signInEmail, signInPassword);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
      setErrorMessage(""); // Clear any previous error
    } catch (err) {
      console.error("Error during email/password sign-in:", err.message);
      setErrorMessage("Invalid user ID or password.");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault(); 
    try {
      const result = await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
      setErrorMessage(""); // Clear any previous error
    } catch (err) {
      console.error("Error during sign-up:", err.message);
      setErrorMessage("Error during sign-up. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome to Chat App</h2>
        <button className="google-btn" onClick={signInWithGoogle}>Sign In With Google</button>
        
        <h3>Or Sign In with Email and Password</h3>
        <form onSubmit={handleEmailSignIn} className="auth-form">
          <input 
            type="email" 
            placeholder="Email" 
            value={signInEmail} 
            onChange={(e) => setSignInEmail(e.target.value)} 
            required 
            className="auth-input"
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={signInPassword} 
            onChange={(e) => setSignInPassword(e.target.value)} 
            required 
            className="auth-input"
          />
          <button type="submit" className="auth-btn">Sign In</button>
        </form>

        {/* Error Message */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* Sign Up Toggle Button */}
        <button className="toggle-btn" onClick={() => setShowSignUp(!showSignUp)}>
          {showSignUp ? "Cancel Sign Up" : "Sign Up"}
        </button>

        {/* Conditional Sign-Up Form */}
        {showSignUp && (
          <>
            <h3>Or Sign Up</h3>
            <form onSubmit={handleSignUp} className="auth-form">
              <input 
                type="email" 
                placeholder="Email" 
                value={signUpEmail} 
                onChange={(e) => setSignUpEmail(e.target.value)} 
                required 
                className="auth-input"
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={signUpPassword} 
                onChange={(e) => setSignUpPassword(e.target.value)} 
                required 
                className="auth-input"
              />
              <button type="submit" className="auth-btn">Sign Up</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
