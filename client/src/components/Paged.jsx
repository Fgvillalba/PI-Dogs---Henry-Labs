import React from 'react';




export default function Paged({breedsPerPage, breeds, paginate}){
 const pages = []; 
 for(var i= 0; i < Math.ceil(breeds/breedsPerPage); i++){
    pages.push(i+1); 
 }
  return (
    <div>
        {pages?.map((p) => (
         <button key={p} onClick={()=>paginate(p)}>{p}</button>  
        ))}
    </div>
  )
}