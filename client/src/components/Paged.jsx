import React from 'react';
import "./Paged.css";
import { useDispatch, useSelector } from 'react-redux'; 
import { setActualPage } from '../actions';



export default function Paged({breedsPerPage, breeds}){
 const dispatch = useDispatch();
 const actualPage = useSelector((state) => state.actualPage);
 const pages = []; 
 for(var i= 0; i < Math.ceil(breeds/breedsPerPage); i++){
    pages.push(i+1); 
 }

 function handleSetPage(e){
  dispatch(setActualPage(Number(e.target.name)))
 }
  return (
    <div className="container">
        {pages?.map((p) => (
         <button className={`button-page ${actualPage === p? "selected": ""}`} key={p} name={p} onClick={handleSetPage}>{p}</button>  
        ))}
    </div>
  )
}

//{`buttonPage ${actualPage === p? "selected": "" }`}