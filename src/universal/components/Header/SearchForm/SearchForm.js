import React, { useContext, useState, useEffect } from 'react';
import { Button, Form, FormControl, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { Context } from '../../Context';

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
