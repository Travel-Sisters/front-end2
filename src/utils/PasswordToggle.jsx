import React from 'react';

const PasswordToggle = ({ visible, onToggle }) => {
  return (
    <img
      onClick={onToggle}
      className={`eye ${visible ? 'hide' : ''}`}
      src={visible ? eyeOff : eye}
      alt=""
    />
  );
};

export default PasswordToggle;
