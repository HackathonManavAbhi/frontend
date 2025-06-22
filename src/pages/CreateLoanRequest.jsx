import React, { useState } from 'react';
import supabase from '../services/supabaseClient';

const CreateLoanRequest = () => {
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = async () => {
    await supabase.from('loan_requests').insert([
      { borrower_id: 'some-uuid', amount, duration_days: duration, status: 'requested' }
    ]);
    alert('Loan request submitted');
  };

  return (
    <div>
      <h2>Create Loan Request</h2>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
      <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Duration (days)" />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CreateLoanRequest;