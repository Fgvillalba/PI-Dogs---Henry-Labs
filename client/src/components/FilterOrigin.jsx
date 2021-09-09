import React from 'react';
import { useDispatch } from 'react-redux';
import { filterByOrigin } from '../actions';


export default function FilterOrigin({title, setActualPage}){
 const dispatch = useDispatch();

 function handleOnChange(e){
  e.preventDefault();
  dispatch(filterByOrigin(e.target.value));
  setActualPage(1);
};


 return (
    <div>
        <span>{title}</span>
        <select onChange={handleOnChange}>
          <option value='all'>All</option>
          <option value='existent'>Existent</option> 
          <option value='created'>Created</option>
        </select>
    </div>
 )
};