import React,{useState} from 'react';
import Vapi from "@vapi-ai/web";
const apiKey = "27093ede-e32e-4331-b91f-a58bd996d130";
const assistantId = "df8c4866-aeaa-4413-ae12-e2267fc68975";
const vapi = new Vapi(apiKey);
const Home = () => {

  const [isRecording, setIsRecording] = useState(false);

  const handleRecord = () => {
    if (!isRecording) {
      // Start recording logic here
      setIsRecording(true);
      alert('Call started!');
      // Add your recording logic here
     vapi.start(assistantId);
    } else {
      // Terminate recording logic here
      setIsRecording(false);
      alert('Call stopped!');
      vapi.stop(assistantId);
    }
  };


  return (
    <div style={{ minHeight: '100vh', position: 'relative', background: '#fafafa' }}>
      <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>Welcome to the Loan App</h1>
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