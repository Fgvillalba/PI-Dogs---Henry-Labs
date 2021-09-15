import { React, useState} from "react";
import { useDispatch} from 'react-redux';
import { getByName, setActualPage } from "../actions";
import style from  './SearchBar.module.css';



export default function SearchBar(){
 const dispatch = useDispatch();   
 const[input, setInput] = useState(""); 
    
 function handleInputChange(e){
  setInput(e.target.value) 
 };

 function handleSubmit(e){
  e.preventDefault();
  dispatch(getByName(input)); 
  setInput("");
  dispatch(setActualPage(1));
 };

 return (
    <div className={style.container}>
        <input className={style.inputSearch} value= {input} type ="text" placeholder="By Breed..." autoComplete = "off" onChange= {handleInputChange}/>
        <button className={style.button} type="submit" onClick={handleSubmit} >SEARCH</button>
    </div>
 )
};