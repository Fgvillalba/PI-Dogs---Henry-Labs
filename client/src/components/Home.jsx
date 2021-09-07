import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'; //hooks que reemplazan el mapStateToProps y las accionts
import { getDogs, getTemperaments } from '../actions';
import { Link } from 'react-router-dom';
import  Option  from './Option';
import Card from './Card';
import Paged from "./Paged";

function Home (){
 const dispatch = useDispatch();
 const dogs = useSelector((state) => state.dogs);  //map state to props: dogs.
 const temps = useSelector((state) => state.temperaments); 
 const [actualPage, setActualPage] = useState(1);
 const [breedsPerPage, setBreedsPerPage] = useState(8);
 const lastBreed = actualPage * breedsPerPage;
 const firstBreed = lastBreed - breedsPerPage;
 const dogsPaged = dogs.slice(firstBreed,lastBreed);

 function paginate(page){
    setActualPage(page);
 }
 
 useEffect(() => {    //cuando el compomente se monta despacho un getDos a mi api
   dispatch(getDogs());
   dispatch(getTemperaments()); 
   dispatch(getTemperaments());
 },[dispatch]);

 function handleReload(e){ 
   e.preventDefault();
   dispatch(getDogs())
 };

 function onSearch(){ //ver como resulver esto

 };

 return (
    <div>
      <Link to='/dog'>Create Race</Link>   
      <h1> DOG BREEDS APP </h1> 
      <button onClick={handleReload}>Reload</button> 
      <div>
        <input id="inputSearch" type ="text" placeholder="By Breed..." autoComplete = "off" />
        <button onClick = {() => onSearch(document.getElementById("inputSearch").value)}>Filter</button>
        <select>
         {temps?.map((t) => (
          <Option
           key = {t.id}
           value = {t.name}
           label = {t.name}
          />  
         ))
         }
        </select>
        <span>Order by</span>
        <select >
          <option value='nameAsc'>name asc</option>
          <option value='nameDesc'>name desc</option> 
          <option value='weightAsc'>weight asc</option>
          <option value='weightDesc'>weight desc</option>
        </select>
        <Paged breedsPerPage={breedsPerPage} breeds={dogs.length} paginate={paginate} />
        <div>
        {dogsPaged?.map((dog) => (
          <Card key={dog.id} dog={dog}/>
        ))
        }
        </div>
      </div>
    </div>
 )
}

export default Home;