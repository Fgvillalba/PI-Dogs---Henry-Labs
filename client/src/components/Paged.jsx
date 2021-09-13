import React from 'react';
import "./Paged.css";



export default function Paged({breedsPerPage, breeds, setActualPage, actualPage}){
 const pages = []; 
 for(var i= 0; i < Math.ceil(breeds/breedsPerPage); i++){
    pages.push(i+1); 
 }
  return (
    <div className="container">
        {pages?.map((p) => (
         <button className={`button-page ${actualPage === p? "selected": ""}`} key={p} onClick={()=>setActualPage(p)}>{p}</button>  
        ))}
    </div>
  )
}

//{`buttonPage ${actualPage === p? "selected": "" }`}