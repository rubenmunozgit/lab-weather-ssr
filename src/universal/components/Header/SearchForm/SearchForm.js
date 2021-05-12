import React, { useContext, useState } from 'react';
import { Button, Form, FormControl, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Select from '../Select';
import { Context } from '../../Context';

const SearchForm = ({ handleSelectedLocation }) => {
  const { lang, translationText } = useContext(Context);
  const [input, setInput] = useState({});
  const [sugestions, setSugestions] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [hasData, setHasData] = useState(false);

  const handleInputChange = (evt) => {
    const { name, value } = evt.currentTarget;
    setInput((input) => ({
      ...input,
      [name]: value,
    }));
  };

  const handleSearchSummit = async (search) => {
    setHasData((hasData) => (hasData = false));
    setLoading((isLoading) => (isLoading = true));
    const { data } = await axios.get(`search?q=${search}&limit=5&lang=${lang}`);

    setLoading((isLoading) => (isLoading = false));
    setSugestions((sugestions) => (sugestions = data));
    if (data.length) {
      setHasData((hasData) => (hasData = true));
    }
  };

  const handleSelected = (selectedLocation) => {
    selectedLocation && handleSelectedLocation(selectedLocation);
  };

  return (
    <>
      <Form inline>
        <FormControl
          name='search'
          type='text'
          placeholder={translationText.find.placeholder}
          className='mr-2'
          onChange={handleInputChange}
        />
        <Button
          className='my-2 my-sm-0 mr-2'
          variant='success'
          onClick={() => handleSearchSummit(input.search)}
        >
          {isLoading ? (
            <Spinner animation='border' role='status' size='sm' />
          ) : (
            translationText.find.btnText
          )}
        </Button>
        {hasData && (
          <Select
            {...{
              sugestions,
              defaultValue: sugestions[0],
              handleSelected,
            }}
          />
        )}
      </Form>
    </>
  );
};

export default SearchForm;
