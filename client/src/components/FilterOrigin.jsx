import React from 'react';
import { useDispatch } from 'react-redux';
import { filterByOrigin, setActualPage } from '../actions';
import style from './Filters.module.css'


export default function FilterOrigin({ title }){
 const dispatch = useDispatch();

 function handleOnChange(e){
  e.preventDefault();
  dispatch(filterByOrigin(e.target.value));
  dispatch(setActualPage(1));
};


 return (
    <div>
        <span className={style.criterio}>{title}</span>
        <select className={style.select} onChange={handleOnChange}>
          <option value='all'>All</option>
          <option value='existent'>Existent</option> 
          <option value='created'>Created</option>
        </select>
    </div>
 )
};