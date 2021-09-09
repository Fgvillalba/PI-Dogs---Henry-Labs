import { React, useState} from "react";
import { useDispatch} from 'react-redux';
import { getByName } from "../actions";


export default function SearchBar({setActualPage}){
 const dispatch = useDispatch();   
 const[input, setInput] = useState(""); 
    
 function handleInputChange(e){
  setInput(e.target.value) 
 };

 function handleSubmit(e){
  e.preventDefault();
  dispatch(getByName(input)); 
  setInput("");
  setActualPage(1); 
 };

 return (
    <div>
        <input value= {input} type ="text" placeholder="By Breed..." autoComplete = "off" onChange= {handleInputChange}/>
        <button type="submit" onClick={handleSubmit} >SEARCH</button>
    </div>
 )
}