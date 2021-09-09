import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'; //hooks que reemplazan el mapStateToProps y las accionts
import { getDogs, getTemperaments, filterByTemp, filterByOrigin, getByName } from '../actions';
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
 
 useEffect(() => {    //cuando el compomente se monta despacho un getDos a mi api
   dispatch(getDogs());
   dispatch(getTemperaments()); 
 },[dispatch]);

 function handleReload(e){ 
   e.preventDefault();
   dispatch(getDogs())
 };

 function handleFilterByTemp(e){
  e.preventDefault();
  dispatch(filterByTemp(e.target.value));
 };
 
 function handleFilterByOrigin(e){
  e.preventDefault();
  dispatch(filterByOrigin(e.target.value));
 } 


 function onSearch(value){ 
  document.getElementById("inputSearch").value = ""
  dispatch(getByName(value));
 };

 return (
    <div>
      <Link to='/dog'>Create Race</Link>   
      <h1> DOG BREEDS APP </h1> 
      <button onClick={handleReload}>Reload</button> 
      <div>
        <input id="inputSearch" type ="text" placeholder="By Breed..." autoComplete = "off" />
        <button onClick = {() => onSearch(document.getElementById("inputSearch").value)}>Filter</button>
        <span>Filter by Origin</span>
        <select onChange={handleFilterByOrigin}>
          <option value='all'>All</option>
          <option value='existent'>Existent</option> 
          <option value='created'>Created</option>
        </select>
        <Filter title='Filter by Temperament' handleFilter={handleFilterByTemp} state={temps}/>
        <span>Order by</span>
        <select >
          <option value='nameAsc'>name asc</option>
          <option value='nameDesc'>name desc</option> 
          <option value='weightAsc'>weight asc</option>
          <option value='weightDesc'>weight desc</option>
        </select>
        <Paged breedsPerPage={breedsPerPage} breeds={dogs.length} paginate={paginate} />
        <Cards dogs={dogsPaged}/>
      </div>
    </div>
 )
}

export default Home;