import React from 'react';
import { Navbar, Nav, Form } from 'react-bootstrap';
import SearchForm from './SearchForm/SearchForm';

const Header = ({ metric, handleSwitchChange, handleSelectedLocation }) => {
  const isChecked = !metric;

  return (
    <Navbar collapseOnSelect expand='md' bg='dark' variant='dark'>
      <Navbar.Brand href='/'>Tiempito</Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Item>
            <Form>
              <p className='text-white text-left d-inline-block mr-2 mb-0'>
                Cº
              </p>
              <Form.Check
                inline
                type='switch'
                id='f-c-switch'
                label='Fº'
                className='text-white'
                onChange={handleSwitchChange}
                checked={isChecked}
              />
            </Form>
          </Nav.Item>
        </Nav>
        <SearchForm {...{ handleSelectedLocation }} />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
