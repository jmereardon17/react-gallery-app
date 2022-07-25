import React from 'react';

const ErrorMessage = ({ title, text }) => (
  <section className="error">
    <h3 className="error-title">{title}</h3>
    <p className="error-msg">{text}</p>
  </section>
);

export default ErrorMessage;