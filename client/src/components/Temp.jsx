import React from 'react';
import style from './Temp.module.css'


export default function Temp({temp}){
 return(
   <li className={style.temp}>{temp} </li>
 )
}