import React, { useState, useEffect } from 'react';
import supabase from '../services/supabaseClient';

const Lend = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function fetchRequests() {
      const { data } = await supabase.from('loan_requests').select('*').eq('status', 'requested');
      setRequests(data);
    }
    fetchRequests();
  }, []);

  const offerLoan = async (requestId, amount) => {
    await supabase.from('loan_offers').insert([
      { lender_id: 'lender-uuid', loan_request_id: requestId, amount, interest_rate: 5, duration_days: 30, status: 'offered' }
    ]);
    alert('Loan offer submitted');
  };

  return (
    <div>
      <h2>Available Loan Requests</h2>
      {requests && requests?.map((req) => (
        <div key={req.id}>
          <p>Amount: {req.amount} | Duration: {req.duration_days} days</p>
          <button onClick={() => offerLoan(req.id, req.amount)}>Offer Loan</button>
        </div>
      ))}
    </div>
  );
};

export default Lend;