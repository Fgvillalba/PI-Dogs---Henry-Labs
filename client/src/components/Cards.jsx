import React from 'react';
import Card from './Card';
import './Cards.css'

export default function Cards({dogs}){
   return(
    <div className='cardList'>
    {dogs.map((dog) => (
      <Card key={dog.id} dog={dog}/>
    ))}
    </div>
   )
};