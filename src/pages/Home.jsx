import React, { useState, useRef, useEffect } from 'react';
import Vapi from "@vapi-ai/web";
const apiKey = "27093ede-e32e-4331-b91f-a58bd996d130";
const assistantId = "c35c764f-8b48-4935-8129-0787d1caf481";
const vapi = new Vapi(apiKey);

const Home = () => {
  const [statements, setStatements] = useState([]); // { sender: 'agent', text: string }
  const [lastAgentStatement, setLastAgentStatement] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const prevIsRecording = useRef(isRecording);

  // Add listeners only once
  useEffect(() => {
    vapi.addListener('statement', (statement) => {
      if (statement.sender === 'agent') {
        setStatements(prev => [...prev, { sender: 'agent', text: statement.text }]);
      }
    });
    vapi.addListener('error', (error) => {
      console.error('Error:', error);
      alert('An error occurred: ' + error.message);
    });
    // No cleanup needed for this SDK
    // eslint-disable-next-line
  }, []);

  const handleRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      vapi.start(assistantId);
      alert('Call started!');
    } else {
      setIsRecording(false);
      vapi.stop(assistantId);
      alert('Call stopped!');
    }
  };

  // Watch for isRecording transition from true to false
  useEffect(() => {
    if (prevIsRecording.current && !isRecording) {
      // Recording just ended 
      const last = [...statements].reverse().find(s => s.sender === 'agent');
      if (last) setLastAgentStatement(last.text);
    }
    prevIsRecording.current = isRecording;
  }, [isRecording, statements]);

  // Log statements for debugging
  useEffect(() => {
    console.log(statements);
  }, [statements]);

  return (
    <div style={{ minHeight: '100vh', position: 'relative', background: '#fafafa' }}>
      <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>Welcome to the Loan App</h1>
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <strong>Last Agent Statement (after call ends):</strong>
        <div>{lastAgentStatement}</div>
      </div>
      <button
        onClick={handleRecord}
        style={{
          position: 'fixed',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: isRecording ? '#555' : 'red',
          border: 'none',
          borderRadius: '50%',
          width: '72px',
          height: '72px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          color: '#fff',
          fontSize: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'background 0.2s',
        }}
        aria-label={isRecording ? "Stop Recording" : "Start Recording"}
      >
        <span style={{ fontSize: '2.5rem', lineHeight: 1 }}>
          {isRecording ? '■' : '●'}
        </span>
      </button>
    </div>
  );
};

export default Home;