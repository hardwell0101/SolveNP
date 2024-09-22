import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import '../styles/SignUp.css';

const SignUp = ({ onToggleView }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="sign-up-container">
      <div className="sign-up">
        {error && <p className="error">{error}</p>}
        <div className="user-image"></div>
        <form onSubmit={handleSignUp}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit" className="sign-up-button"></button>
        </form>
        <div className="toggle-view">
          <p>
            Already have an account?{' '}
            <button onClick={onToggleView}>Sign in here</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;