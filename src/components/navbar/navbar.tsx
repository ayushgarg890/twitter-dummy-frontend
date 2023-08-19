import React from 'react';
import { Link } from 'react-router-dom';
import './style.css'
import { useAuth } from '../authentication/Auth-context';
import * as _ from 'lodash';

const Navbar = () => {
  
  const {token, logout} = useAuth();
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Twitter Clone</Link>
      </div>
      <ul className="navbar-links">
        { !_.isNull(token) || _.isUndefined(token) ? (
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/timeline">Timeline</Link>
            </li>
            <li>
              <Link to="/mytweet">My Tweets</Link>
            </li>
            <li>
              <button className='logout-button' onClick={()=> logout()}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
