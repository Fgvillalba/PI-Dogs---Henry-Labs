import style from './Home.module.css'
import reload from '../images/reload.svg'
import { React, useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux'; 
import { getDogs, setActualPage } from '../actions';
import Cards from './Cards';
import Paged from "./Paged";
import FilterTemp from "./FilterTemp";
import FilterOrigin from "./FilterOrigin";
import Order from "./Order";


function Home (){
 const dispatch = useDispatch();
 const dogs = useSelector((state) => state.dogs);  
 const actualPage = useSelector((state) => state.actualPage);
 

 const breedsPerPage = 8;
 const lastBreed = actualPage * breedsPerPage;
 const firstBreed = lastBreed - breedsPerPage;
 const dogsPaged = dogs.slice(firstBreed,lastBreed);

 useEffect(() => {    
   dispatch(getDogs()); 
 },[]);

 function handleReload(e){ 
   e.preventDefault();
   dispatch(getDogs());
   dispatch(setActualPage(1));
 };

 
 return (
    <div>  
      <div className={style.topCointainer}>
       <div className={style.buttonsContainer}>
        <Order />
        <button className={style.reload} onClick={handleReload}><img src={reload} alt='reload icon'/></button> 
       </div>
       <div className={style.filtersContainer}>
        <span className={style.spanTitle}>Filter by </span>
        <FilterOrigin title='Origin'/>
        <FilterTemp title='Temperament' />
       </div>
      </div>
        <Paged breedsPerPage={breedsPerPage} breeds={dogs.length} />
        <Cards dogs={dogsPaged}/>
    </div>
 )
};

export default Home;