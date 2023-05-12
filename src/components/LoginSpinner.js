import React from 'react';
import spinner from '../images/login-spinner.gif';

const LoginSpinner = () => {
    return (
        <div>
            <img
                src={spinner}
                style={{ width: '70px', margin: 'auto', marginBottom: '15px', display: 'block' }}
                alt='Loading...'
            />
        </div>
    );
};

export default LoginSpinner;
