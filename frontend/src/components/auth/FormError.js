import React from 'react';

const FormError = ({ error, fieldErrors }) => {
  // Genel form hatası veya özel alan hataları varsa göster
  if (!error && (!fieldErrors || Object.keys(fieldErrors).length === 0)) {
    return null;
  }

  // Genel hata varsa onu göster
  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  // Alan hatalarını liste şeklinde göster
  return (
    <div className="alert alert-danger">
      <ul className="mb-0">
        {Object.values(fieldErrors).map((errorText, index) => (
          errorText && <li key={index}>{errorText}</li>
        ))}
      </ul>
    </div>
  );
};

export default FormError; 