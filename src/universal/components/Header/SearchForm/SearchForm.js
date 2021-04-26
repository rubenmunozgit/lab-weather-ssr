import React, { useContext, useState, useEffect } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { Context } from '../../Context';

const makeKey = ({ name, state, country }) => {
  return `${name}, ${state ? `${state}, ` : ''}${country}`;
};

const AutoComplete = ({
  sugestions = [],
  defaultValue = {},
  handleSelected,
}) => {
  const { key } = defaultValue;
  const [selected, setSelected] = useState('');

  useEffect(() => {
    const findSugestion = sugestions.find(
      (suggest) => suggest.key === selected
    );

    handleSelected(findSugestion);
  }, [selected]);

  const handleOnSelect = (evt) => {
    const { value } = evt.currentTarget;

    setSelected((selected) => (selected = value));
  };

  if (!sugestions.length) {
    return null;
  }

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
            {suggest.local_name}, {suggest.state && `${suggest.state}, `}
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

  useEffect(() => {
    sugestions[0] && handleSelectedLocation(sugestions[0]);
  }, [sugestions]);

  const handleInputChange = (evt) => {
    const { name, value } = evt.currentTarget;
    setInput((input) => ({
      ...input,
      [name]: value,
    }));
  };

  const handleSearchSummit = async (search) => {
    const { data } = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=7289e9613cb8f800099af227a5133275`
    );
    const sugestionTransformed = data.map((sugestion) => ({
      key: makeKey(sugestion),
      name: sugestion.name,
      state: sugestion.state || '',
      country: sugestion.country,
      local_name: sugestion.local_names[lang] || sugestion.name,
      lat: sugestion.lat,
      lon: sugestion.lon,
    }));
    setSugestions((sugestions) => (sugestions = sugestionTransformed));
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
          {translationText.find.btnText}
        </Button>
        <AutoComplete
          {...{ sugestions, defaultValue: sugestions[0], handleSelected }}
        />
      </Form>
    </>
  );
};

export default SearchForm;