import {React, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getById, clear } from '../actions';
import Temp from './Temp';



export default function Card({match: { params: {id}}}){
 const dispatch = useDispatch();

 
 useEffect(() => {
   dispatch(getById(id))
   return () => {
    dispatch(clear())
  }
 },[]);   

 const breed = useSelector((state) => state.breedDetail);

  return(
   <div>
       {breed? 
       <div> 
        <img src={breed.image} alt='Not found' width= '200px' height='200px'/>
        <h3>{breed.name}</h3>
        <h5>Weight:</h5>
        <span>{breed.weight}</span>
        <h5>Height:</h5>
        <span>{breed.height}</span>
        <h5>Life Span:</h5>
        <span>{breed.life_span}</span>
        <div>
         <h5>Temperaments:</h5> 
         {breed.temperaments?.map((t) => {
          return <Temp key={t} temp={t}/>    
         })}
        </div>
       </div> : <span> Cargando... </span> }
   </div>
 )
};