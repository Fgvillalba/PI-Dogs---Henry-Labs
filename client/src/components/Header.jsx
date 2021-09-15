import React from 'react';
import NavBar from './NavBar';
import SearchBar from './SearchBar';
import "./Header.css";


export default function Header() {
  return (
    <section>
        <h1 className="logo">
          DOG BREEDS APP
        </h1>
        <SearchBar />  
        <NavBar/> 
    </section>
  );
};