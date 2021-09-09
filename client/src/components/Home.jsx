import { React, useEffect, useState } from "react";
import { useDispatch, useSelector} from 'react-redux'; //hooks que reemplazan el mapStateToProps y las accionts
import { getDogs, getTemperaments, filterByTemp, filterByOrigin, getByName, orderByWeight, orderByName } from '../actions';
import { Link } from 'react-router-dom';
import Cards from './Cards';
import Paged from "./Paged";
import Filter from "./Filter";

function Home (){
 const dispatch = useDispatch();
 const dogs = useSelector((state) => state.dogs);  //map state to props: dogs.
 const temps = useSelector((state) => state.temperaments); 

 
 //Paginado
 const [actualPage, setActualPage] = useState(1);
 const [breedsPerPage, setBreedsPerPage] = useState(8);
 const lastBreed = actualPage * breedsPerPage;
 const firstBreed = lastBreed - breedsPerPage;
 const dogsPaged = dogs.slice(firstBreed,lastBreed);

 function paginate(page){
    setActualPage(page);
 }
 
 useEffect(() => {    
   dispatch(getDogs());
   dispatch(getTemperaments()); 
 },[dispatch]);

 function handleReload(e){ 
   e.preventDefault();
   dispatch(getDogs());
   setActualPage(1);
 };

 function handleFilterByTemp(e){
  e.preventDefault();
  dispatch(filterByTemp(e.target.value));
  setActualPage(1);
 };
 
 function handleFilterByOrigin(e){
  e.preventDefault();
  dispatch(filterByOrigin(e.target.value));
  setActualPage(1);
 } 


 function onSearch(value){ 
  document.getElementById("inputSearch").value = ""
  dispatch(getByName(value));
  setActualPage(1);
 };

 function handleOrdByWeight(e){
  dispatch(orderByWeight(e.target.id));
  setActualPage(1);
 };

 function handleOrdByName(e){
  dispatch(orderByName(e.target.id));
  setActualPage(1);
 }

 return (
    <div>
      <Link to='/dog'>Create Race</Link>   
      <h1> DOG BREEDS APP </h1> 
      <button onClick={handleReload}>Reload</button> 
      <div>
        <input id="inputSearch" type ="text" placeholder="By Breed..." autoComplete = "off" />
        <button onClick = {() => onSearch(document.getElementById("inputSearch").value)}>SEARCH</button>
        <span>FILTER BY ORIGIN</span>
        <select onChange={handleFilterByOrigin}>
          <option value='all'>All</option>
          <option value='existent'>Existent</option> 
          <option value='created'>Created</option>
        </select>
        <Filter title='Filter by Temperament' handleFilter={handleFilterByTemp} state={temps}/>
        <button id="wAsc" onClick={handleOrdByWeight}>weight-asc</button>
        <button id="wDesc" onClick={handleOrdByWeight}>weight-desc</button>
        <button id="az" onClick= {handleOrdByName}>a-z</button>
        <button id="za" onClick= {handleOrdByName}>z-a</button>
        <Paged breedsPerPage={breedsPerPage} breeds={dogs.length} paginate={paginate} />
        <Cards dogs={dogsPaged}/>
      </div>
    </div>
 )
}

export default Home;