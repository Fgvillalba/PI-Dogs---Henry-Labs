import {React, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getTemperaments, filterByTemp, setActualPage } from '../actions';
import style from './Filters.module.css'


export default function FilterTemp({ title }){
 const dispatch = useDispatch();
 const temps = useSelector((state) => state.temperaments);

 useEffect(() => {    
  dispatch(getTemperaments()); 
 },[dispatch]);

 function handleOnChange(e){
  e.preventDefault();
  dispatch(filterByTemp(e.target.value));
  dispatch(setActualPage(1));
};


 return (
    <div>
        <span className={style.criterio}>{title}</span>
        <select className={style.select} onChange={handleOnChange}>
         {[{id:"All",  name: "All"}, ...temps].map((t) => (
          <option
           key = {t.id}
           value = {t.name}>
          {t.name}
          </option>
         ))}
        </select>
    </div>
 )
};
