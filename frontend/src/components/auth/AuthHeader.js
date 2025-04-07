import React from 'react';
import hondaLogo from '../../assets/honda-logo.svg';

const AuthHeader = ({ title, instruction }) => {
  return (
    <div className="text-center mb-4">
      <img src={hondaLogo} alt="Honda Logo" className="honda-logo" />
      <h1 className="welcome-text">{title}</h1>
      <p className="register-instruction">
        {instruction}
      </p>
    </div>
  );
};

export default AuthHeader; 