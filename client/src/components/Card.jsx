import React from 'react';
import Temp from './Temp';
import {Link} from 'react-router-dom';
import './Card.css';


export default function Card({dog}){
   return(
   <div className="cardContainer">
       <div>
       <img src={dog.image} alt='Not found' width= '200px' height='200px'/>
       </div>
       <div>
       <Link to={`/dog/${dog.id}`}>
       <h3># {dog.name}</h3>
       </Link>
       <h4>Weight   {dog.weight}</h4>
       <ul className='contentTemp'>
       {dog.temperaments?.map((t) => {
          return <Temp key={t} temp={t}/>    
        })}
        </ul>
       </div>
   </div>
 )
}