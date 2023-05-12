import React from 'react';
import spinner from '../images/spinner2.gif';

const LoadingDisplay = () => {
  return (
    <div>
      <img
        src={spinner}
        style={{ width: '100px', margin: 'auto', display: 'block' }}
        alt='Loading...'
      />
    </div>
  );
};

export default LoadingDisplay;
