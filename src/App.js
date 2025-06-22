import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateLoanRequest from './pages/CreateLoanRequest';
import Lend from './pages/Lend';
import Home from './pages/Home';
// Importing Vapi for AI integration
function App() {
  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <h1>P2P Micro-Lending Platform</h1>
        <nav>
          <Link to="/" style={{ marginRight: '20px' }}>Home</Link>
          <Link to="/create-loan" style={{ marginRight: '20px' }}>Request Loan</Link>
          <Link to="/lend">Lend Money</Link>
        </nav>
        <hr />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/create-loan" element={<CreateLoanRequest />} />
          <Route path="/lend" element={<Lend />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
