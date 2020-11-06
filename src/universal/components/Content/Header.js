import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';

const Header = ({metric, handleSwitchChange}) => {
  const isChecked = !metric;

  return (
    <Navbar collapseOnSelect expand='md' bg='dark' variant='dark'>
      <Navbar.Brand href='/'>WR</Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Item >
            <Form>
              <p className='text-white text-left d-inline-block mr-2 mb-0'>Cº</p>
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
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
