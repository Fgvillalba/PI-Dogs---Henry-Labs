import React from 'react';



export default function Filter({title, handleFilter, state}){
 return (
    <div>
        <span>{title}</span>
        <select onChange={handleFilter}>
         {state?.map((s) => (
          <option
           key = {s.id}
           value = {s.name}>
          {s.name}
          </option>
         ))}
        </select>
    </div>
 )
};
