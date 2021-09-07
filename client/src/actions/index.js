import axios from 'axios';
export const GET_DOGS = "GET_DOGS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS"




export function getDogs(){
    return async function(dispatch) {
       var res = await axios.get("http://localhost:3001/dogs");
       dispatch({ type: GET_DOGS, payload: res.data});
    }
};

export function getTemperaments(){
    return async function(dispatch) {
       var res = await axios.get("http://localhost:3001/temperament");
       dispatch({ type: GET_TEMPERAMENTS, payload: res.data});
    }
};