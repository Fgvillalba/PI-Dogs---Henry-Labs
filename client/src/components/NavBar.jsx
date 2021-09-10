import React from 'react';
import { NavLink } from 'react-router-dom';


export default function NavBar() {
  return (
    <div >
      <div >
      <NavLink  activeStyle={{fontWeight: "700"}} to='/home'>
        <span>
          Home    
        </span>
      </NavLink>
      <NavLink activeStyle={{fontWeight: "700"}} to='/home/dog'>
        <span>  Create Breed</span>
      </NavLink>
      </div>
    </div>
  );
};