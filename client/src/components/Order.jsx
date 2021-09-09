import React from 'react';
import { useDispatch } from 'react-redux';
import { orderByName, orderByWeight } from '../actions';

export default function Order ({setActualPage}){
 const dispatch = useDispatch();

 function handleOrdByWeight(e){
    dispatch(orderByWeight(e.target.id));
    setActualPage(1);
 };
  
 function handleOrdByName(e){
    dispatch(orderByName(e.target.id));
    setActualPage(1);
 };   
 
 return (
   <div>
    <button id="wAsc" onClick={handleOrdByWeight}>w-asc</button>
    <button id="wDesc" onClick={handleOrdByWeight}>w-desc</button>
    <button id="az" onClick= {handleOrdByName}>a-z</button>
    <button id="za" onClick= {handleOrdByName}>z-a</button>
   </div> 
 )
};