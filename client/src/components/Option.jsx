import { React } from 'react';


function Option({value, label}){
   return(
       <>
        <option value={value}>{label}</option>
       </>
   ) 
};

export default Option;