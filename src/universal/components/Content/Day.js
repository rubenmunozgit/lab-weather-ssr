import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import umbrela from '../Icons/umbrella.svg';
import { Context } from '../Context';
import './Day.css';

const Day = ({ dt_local, icon, temp, weather, pop }) => {
  const { translationText } = useContext(Context);
  const { description } = weather[0];

  return (
    temp.max &&
    temp.min &&
    description && (
      <Card className='w-100 flex-row justify-content-around align-items-center flex-lg-column p-2'>
        <h4 className='flex-grow-1'>{dt_local}</h4>
        <img
          className='p-3'
          src={`/static/icons/${icon}`}
          alt={description}
          width={80}
          height={80}
        />
        <Card.Body className='flex-grow-2 d-flex flex-lg-column justify-content-around px-0 py-2'>
          {pop > 0 && (
            <div className='d-flex align-items-center px-0 py-2'>
              <img
                className='d-inline'
                src={umbrela}
                width={24}
                height={24}
                alt='chance of rainning'
              />
              <div className='d-inline ml-2'>{(pop * 100).toFixed(0)}%</div>
            </div>
          )}
          <div className='d-flex flex-column align-items-lg-center px-lg-0 py-lg-2'>
            <div className='d-inline ml-2 max'>{`${translationText.hight}: ${temp.max}`}</div>
            <div className='d-inline ml-2 min'>{`${translationText.low}: ${temp.min}`}</div>
          </div>
        </Card.Body>
      </Card>
    )
  );
};

export default Day;
