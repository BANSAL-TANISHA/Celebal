// SuccessPage.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Form Submitted Successfully!</h2>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <button onClick={() => navigate('/')}>Go Back</button>
    </div>
  );
};

export default SuccessPage;