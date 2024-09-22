import React, { useState, useEffect, useRef } from 'react';
import { auth } from '../firebase';
import './ChatInterface.css';
import arrowIcon from '../assets/12.png';

const ChatInterface = ({ user }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isHoveringAI, setIsHoveringAI] = useState(false);
  const [isHoveringComplexity, setIsHoveringComplexity] = useState(false);
  const [isSidebarPinned, setIsSidebarPinned] = useState(false); // New state for pinning
  const textareaRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isSidebarPinned) {
        if (e.clientX <= 50) {
          setIsSidebarExpanded(true);
        } else if (e.clientX > 250) {
          setIsSidebarExpanded(false);
        }
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isSidebarPinned]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!question.trim()) {
      setError('Question cannot be empty');
      setIsLoading(false);
      return;
    }

    if (question.length > 500) {
      setError('Question is too long (max 500 characters)');
      setIsLoading(false);
      return;
    }

    try {
      const token = await user.getIdToken();
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ text: question }),
      });

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.detail || 'An error occurred');
        }
        setAnswer(data.answer);
      } else {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        throw new Error('Received non-JSON response from server');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
      setAnswer('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className={`chat-interface-container ${isSidebarExpanded ? 'sidebar-expanded' : ''}`}>
      <div className={`sidebar ${isSidebarExpanded ? 'expanded' : ''}`}>
        <div className="sidebar-content">
          <button onClick={() => {
            if (isSidebarExpanded) {
              setIsSidebarPinned(!isSidebarPinned);
            } else {
              setIsSidebarExpanded(true);
            }
          }} className="toggle-button" aria-label={isSidebarPinned ? "Unpin sidebar" : "Pin sidebar"}>
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={isSidebarPinned ? 'pinned' : ''}>
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
          {isSidebarExpanded && (
            <>
              <div className="sidebar-element ai-agents">
                <h2>AI Agents</h2>
                <p>Coming soon: AI-powered prompt enhancements</p>
              </div>
              <div className="sidebar-element complexity-problems">
                <h2>Computational Complexity</h2>
                <p>Coming soon: Explore key problems, descriptions, status updates, and research links from major complexity classes.</p>
              </div>
            </>
          )}
        </div>
        {isSidebarExpanded && (
          <button onClick={handleSignOut} className="sign-out-button">
            Sign Out
          </button>
        )}
      </div>
      <div className="chat-interface">
        <div className="question-form-container">
          <form onSubmit={handleSubmit} className="question-form">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask Anything..."
              className="question-input"
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading} className="submit-button">
              <img src={arrowIcon} alt="Ask" className="arrow-icon" />
            </button>
          </form>
        </div>
        {isLoading && <div className="loading-indicator">Loading...</div>}
        {error && <p className="error-message">{error}</p>}
        {answer && (
          <div className="answer-container">
            <p className="answer-text">{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;