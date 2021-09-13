import {React, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getById, clear } from '../actions';
import Temp from './Temp';
import './BreedDetail.css'



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
   <div className='container'>
       {breed? 
       <div className='breedContainer'> 
        <div>
        <img src={breed.image} alt='Not found' width= '200px' height='200px'/>
        </div>
        <div className='info'>
        <h3>{breed.name}</h3>
        <div>
        <ul className='caracteristics'>
        <li><span>Weight:</span> {breed.weight}</li>
        <li><span>Height:</span> {breed.height}</li>
        <li><span>Life Span:</span> {breed.life_span}</li>
        </ul>
        </div>
        <div>
        <h4>Temperaments:</h4> 
         <ul className='contentTemp'>
         {breed.temperaments?.map((t) => {
          return <Temp key={t} temp={t}/>    
         })}
         </ul>
        </div>
        </div>
       </div> : <span> Cargando... </span> }
   </div>
 )
};