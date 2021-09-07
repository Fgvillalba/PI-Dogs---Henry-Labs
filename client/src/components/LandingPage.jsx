import React from 'react';
import { Link } from 'react-router-dom';



export default function LandingPage(){
    return(
        <div>
            <h1> THE DOG BREEDS APP </h1>
            <Link to='/home'>
               <button> GO HOME </button> 
            </Link>
        </div>
    )
}