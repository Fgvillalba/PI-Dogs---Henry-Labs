import React from 'react';
import Card from './Card';


export default function Cards({dogs}){
   return(
    <div>
    {dogs.map((dog) => (
      <Card key={dog.id} dog={dog}/>
    ))}
    </div>
   )
};