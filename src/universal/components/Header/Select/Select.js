import React, { useState, useEffect } from 'react';
import { Form, FormControl } from 'react-bootstrap';

const Select = ({ sugestions = [], defaultValue = {}, handleSelected }) => {
  const { key } = defaultValue;
  const [selected, setSelected] = useState(key);

  useEffect(() => {
    const findSelectedLocation =
      sugestions.find((suggest) => suggest.key === selected) || false;

    handleSelected(findSelectedLocation);
  }, [selected]);

  const handleOnSelect = (evt) => {
    const { value } = evt.currentTarget;
    setSelected((selected) => (selected = value));
  };

  return (
    <Form.Group controlId='findCity' className='my-2 my-sm-0'>
      <FormControl
        as='select'
        custom
        onChange={handleOnSelect}
        value={selected || key}
      >
        {sugestions.map((suggest) => (
          <option key={suggest.key}>
            {suggest.city}, {suggest.regionName && `${suggest.regionName}, `}
            {suggest.country}
          </option>
        ))}
      </FormControl>
    </Form.Group>
  );
};

export default Select;
