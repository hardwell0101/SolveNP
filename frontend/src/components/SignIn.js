import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../firebase';
import '../styles/SignIn.css';

const SignIn = ({ onToggleView }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.textContent = `
      const circles = document.querySelectorAll('.circle');
      const tooltip = document.createElement('div');
      tooltip.style.position = 'absolute';
      tooltip.style.background = 'rgba(0, 0, 0, 0.7)';
      tooltip.style.color = 'white';
      tooltip.style.padding = '5px';
      tooltip.style.borderRadius = '5px';
      tooltip.style.pointerEvents = 'none';
      document.body.appendChild(tooltip);

      circles.forEach(circle => {
        circle.addEventListener('mousemove', (e) => {
          const rect = circle.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          circle.style.background = \`radial-gradient(circle at \${x}px \${y}px, rgba(0, 255, 255, 0.2), rgba(0, 255, 255, 0.1))\`;

          tooltip.textContent = circle.querySelector('span').textContent;
          tooltip.style.left = \`\${e.pageX + 10}px\`;
          tooltip.style.top = \`\${e.pageY + 10}px\`;
          tooltip.style.display = 'block';
        });

        circle.addEventListener('mouseleave', () => {
          circle.style.background = '';
          tooltip.style.display = 'none';
        });
      });

      const npCircle = document.getElementById('npCircle');
      npCircle.classList.add('pop');
      setTimeout(() => {
        npCircle.classList.remove('pop');
      }, 30000);
    `;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="sign-in-container">
      <div className="sign-in">
        {error && <p className="error">{error}</p>}
        <div className="container">
          <div className="circle"><span style={{visibility: "hidden"}}>DECIDABLE</span></div>
          <div className="circle"><span style={{visibility: "hidden"}}>EXPSPACE</span></div>
          <div className="circle"><span style={{visibility: "hidden"}}>EXPTIME</span></div>
          <div className="circle"><span style={{visibility: "hidden"}}>PSPACE = NPSPACE</span></div>
          <div className="circle"><span style={{visibility: "hidden"}}>N vs NP</span></div>
          <div className="circle pop" id="npCircle"><span>NP</span></div>
        </div>
        <form onSubmit={handleSignIn}>
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
          <button type="submit" className="sign-in-button"></button>
        </form>
        <button onClick={handleGoogleSignIn} className="google-sign-in">Continue with Google</button>
        <div className="toggle-view">
          <p>
            Don't have an account?{' '}
            <button onClick={onToggleView}>Join here</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;