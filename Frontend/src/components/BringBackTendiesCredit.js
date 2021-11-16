import './../styles/Login.css';
import logo from './../images/bringbacktendies.png';
import React from 'react';

const BringBackTendiesCredit = () => {
  return (
    <div className='bringBackTendiesCredit'>
      <img className='bbtLogo' src={logo} alt='Bring Back Tendies Logo'/>
    </div>
  );
};

export default BringBackTendiesCredit;