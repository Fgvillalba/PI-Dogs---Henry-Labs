import React from 'react';




export default function Paged({breedsPerPage, breeds, setActualPage}){
 const pages = []; 
 for(var i= 0; i < Math.ceil(breeds/breedsPerPage); i++){
    pages.push(i+1); 
 }
  return (
    <div>
        {pages?.map((p) => (
         <button key={p} onClick={()=>setActualPage(p)}>{p}</button>  
        ))}
    </div>
  )
}