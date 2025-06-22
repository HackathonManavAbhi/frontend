import React, { useState, useRef, useEffect } from 'react';
import Vapi from "@vapi-ai/web";
const apiKey = "27093ede-e32e-4331-b91f-a58bd996d130";
const assistantId = "c35c764f-8b48-4935-8129-0787d1caf481";
const vapi = new Vapi(apiKey);
const socket = new WebSocket("ws://localhost:8765");

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

  socket.onopen = () => {
    console.log("Connected to Python WebSocket");
  };
  
  socket.onmessage = (event) => {
    console.log("Agent response:", event.data);
  };
  
  const sendToAgent = (text) => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(text);
    } else {
      console.error("WebSocket not open.");
    }
  };
  

  const handleRecord = () => {
    if (!isRecording) {
      try {
        setIsRecording(true);
        vapi.start(assistantId);
        alert('Call started!');
      } catch (error) {
        console.error("An error occurred during start:", error);
        alert("Failed to start call: " + error.message);
        setIsRecording(false);
      }
    } else {
      try {
        setIsRecording(false);
        vapi.stop(assistantId);
        sendToAgent("To summarize, you’ve been approved for a loan of 1200 at an interest rate of 6% for a term of 12 months. The funds will be deposited into your SmartLoan Wallet shortly. You can review your repayment schedule and manage your loan details through your dashboard. Thank you for choosing SmartLoan!")
        alert('Call stopped!');
      } catch (error) {
        console.error("An error occurred during stop:", error);
        alert("Failed to stop call: " + error.message);
      }
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