import React from 'react';
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css';



export default function LandingPage(){
    return(
        <div className={style.container}>
            <h1 className={style.title}> THE DOG BREEDS APP </h1>
            <Link to='/home'>
               <button className={style.button}> GO HOME </button> 
            </Link>
        </div>
    )
}