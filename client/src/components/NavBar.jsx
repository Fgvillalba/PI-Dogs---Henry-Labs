import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';


export default function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink  activeStyle={{fontWeight: "700"}} to='/home'>
            Home    
        </NavLink>
        </li>
        <li>
        <NavLink activeStyle={{fontWeight: "700"}} to='/dog'>
        Create Breed
        </NavLink>
        </li>
      </ul>
    </nav>
  );
};