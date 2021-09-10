import React from 'react';
import Temp from './Temp';
import {Link} from 'react-router-dom';


export default function Card({dog}){
   return(
   <div>
       <img src={dog.image} alt='Not found' width= '200px' height='200px'/>
       <Link to={`/home/dog/${dog.id}`}>
       <h3>{dog.name}</h3>
       </Link>
       <h5>Weight: {dog.weight}</h5>
       {dog.temperaments?.map((t) => {
          return <Temp key={t} temp={t}/>    
        })}
   </div>
 )
}