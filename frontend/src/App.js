import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';
import ChatInterface from './components/ChatInterface';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      {user ? (
        <ChatInterface user={user} />
      ) : (
        <>
          {showSignUp ? (
            <SignUp onToggleView={() => setShowSignUp(false)} />
          ) : (
            <SignIn onToggleView={() => setShowSignUp(true)} />
          )}
        </>
      )}
    </div>
  );
}

export default App;