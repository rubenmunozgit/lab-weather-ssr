import React from 'react';
import refreshIcon from '../Icons/refresh-cw.svg';

const Refresh = ({ refreshHandle }) => (
  <a href='#'>
    <img
      className='inline'
      src={refreshIcon}
      width={24}
      height={24}
      onClick={refreshHandle}
    />
  </a>
);

export default Refresh;
