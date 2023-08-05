import * as React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import ProfileAvatar from './ProfileAvatar';

const Nav = () => {

  const style = {
    listStyleType: "none",
    margin: "0",
    padding: "0",
    overflow: 'hidden',
    backgroundColor: '#333333'
  };

  const style1 = {
    float: 'left',
    margin: '18px',
    marginLeft: '25px',
    color: 'white'
  };

  return (
    <>
      {localStorage.getItem('auth-token') && <nav>
        <ul style={style} >
          <li style={style1} >
            <Link style={{ textDecoration: "none", color: "white" }} to="/">Home</Link>
          </li>
          <li style={style1} >
            <Link style={{ textDecoration: "none", color: "white" }} to="/about">About</Link>
          </li>
          
          <li style={{
            float: 'right', marginTop: "10px",
            marginRight: '10px'
          }}>
            <Link style={{ textDecoration: "none" }} to="">
              <ProfileAvatar />
            </Link>
          </li>
        </ul>
      </nav>}
    </>
  )
}

export default Nav;