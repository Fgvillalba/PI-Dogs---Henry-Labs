import React from 'react';
import Temp from './Temp';


export default function Card({dog}){
   return(
   <div>
       <img src={dog.image} alt='Not found' width= '200px' height='200px'/>
       <h3>{dog.name}</h3>
       <h5>Weight:</h5>
       <span>{dog.weight}</span>
       {dog.temperaments?.map((t) => {
          if(dog.createdAt){ 
          return <Temp key={t.id} temp={t.name}/>
          } 
           return <Temp key={t} temp={t}/>    
         })}
   </div>
 )
}