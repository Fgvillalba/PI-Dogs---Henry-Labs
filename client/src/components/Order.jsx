import React from 'react';
import { useDispatch } from 'react-redux';
import { orderByName, orderByWeight } from '../actions';
import style from './Order.module.css'

export default function Order (){
 const dispatch = useDispatch();

 function handleOrdByWeight(e){
    dispatch(orderByWeight(e.target.id));
 };
  
 function handleOrdByName(e){
    dispatch(orderByName(e.target.id));
 };   
 
 return (
   <div>
    <button className={style.buttons} id="wAsc" onClick={handleOrdByWeight}>w-asc</button>
    <button className={style.buttons} id="wDesc" onClick={handleOrdByWeight}>w-desc</button>
    <button className={style.buttons} id="az" onClick= {handleOrdByName}>a-z</button>
    <button className={style.buttons} id="za" onClick= {handleOrdByName}>z-a</button>
   </div> 
 )
};