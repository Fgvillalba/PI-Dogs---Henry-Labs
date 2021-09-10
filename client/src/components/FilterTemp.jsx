import {React, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getTemperaments, filterByTemp } from '../actions';


export default function FilterTemp({title, setActualPage}){
 const dispatch = useDispatch();
 const temps = useSelector((state) => state.temperaments);

 useEffect(() => {    
  dispatch(getTemperaments()); 
 },[dispatch]);

 function handleOnChange(e){
  e.preventDefault();
  dispatch(filterByTemp(e.target.value));
  setActualPage(1);
};


 return (
    <div>
        <span>{title}</span>
        <select onChange={handleOnChange}>
         {temps?.map((t) => (
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
