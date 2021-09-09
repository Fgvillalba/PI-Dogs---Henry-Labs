import { React, useEffect, useState } from "react";
import { useDispatch, useSelector} from 'react-redux'; //hooks que reemplazan el mapStateToProps y las accionts
import { getDogs, getTemperaments} from '../actions';
import Cards from './Cards';
import Paged from "./Paged";
import FilterTemp from "./FilterTemp";
import FilterOrigin from "./FilterOrigin";
import SearchBar from "./SearchBar";
import Order from "./Order";

function Home (){
 const dispatch = useDispatch();
 const dogs = useSelector((state) => state.dogs);  //map state to props: dogs.
 
 //Paginado
 const [actualPage, setActualPage] = useState(1);
 const breedsPerPage = 8;
 const lastBreed = actualPage * breedsPerPage;
 const firstBreed = lastBreed - breedsPerPage;
 const dogsPaged = dogs.slice(firstBreed,lastBreed);

 useEffect(() => {    
   dispatch(getDogs());
   dispatch(getTemperaments()); 
 },[dispatch]);

 function handleReload(e){ 
   e.preventDefault();
   dispatch(getDogs());
   setActualPage(1);
 };

 return (
    <div>  
      <h1> DOG BREEDS APP </h1> 
      <button onClick={handleReload}>Reload</button> 
      <div>
        <SearchBar setActualPage={setActualPage}/>
        <Order setActualPage={setActualPage}/>
        <FilterOrigin title='Filter by origin' setActualPage={setActualPage}/>
        <FilterTemp title='Filter by Temperament' setActualPage={setActualPage}/>
        <Paged breedsPerPage={breedsPerPage} breeds={dogs.length} setActualPage={setActualPage} />
        <Cards dogs={dogsPaged}/>
      </div>
    </div>
 )
};

export default Home;