import React from 'react';
import './Button.css';

const Button = ({ text, onClick }) => (
  <button onClick={onClick}>
    {text}
  </button>
);

export default Button;