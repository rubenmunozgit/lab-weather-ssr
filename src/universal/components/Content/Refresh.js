import React from 'react';
import refreshIcon from '../Icons/refresh-cw.svg';

const Refresh = ({ refreshHandle }) => {
  return (
    <img
      className='inline'
      src={refreshIcon}
      width={24}
      height={24}
      onClick={refreshHandle}
    />
  );
};

export default Refresh;
