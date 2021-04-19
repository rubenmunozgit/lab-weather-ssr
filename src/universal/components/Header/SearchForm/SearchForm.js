import React, { useState } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';

const SearchForm = ({ handleSearchSummit }) => {
  const [input, setInput] = useState({});

  const handleInputChange = (evt) => {
    const { name, value } = evt.currentTarget;
    setInput((input) => ({
      ...input,
      [name]: value,
    }));
  };

  return (
    <Form inline>
      <FormControl
        name='search'
        type='text'
        placeholder='Search'
        className='mr-sm-2'
        onChange={handleInputChange}
      />
      <Button
        variant='success'
        onClick={() => handleSearchSummit(input.search)}
      >
        Submit
      </Button>
    </Form>
  );
};

export default SearchForm;
