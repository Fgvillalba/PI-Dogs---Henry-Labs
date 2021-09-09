import axios from 'axios';
export const GET_DOGS = "GET_DOGS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const FILTER_BY_TEMP = "FILTER_BY_TEMP";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";
export const GET_BY_NAME = "GET_BY_NAME";




export function getDogs(){
    return async function(dispatch) {
       var res = await axios.get("http://localhost:3001/dogs");
       dispatch({ type: GET_DOGS, payload: res.data});
    }
};

export function getByName(payload){
    return async function(dispatch) {
        var res = await axios.get(`http://localhost:3001/dogs?name=${payload}`);
        dispatch({ type: GET_BY_NAME, payload: res.data});
     }
};

export function getTemperaments(){
    return async function(dispatch) {
       var res = await axios.get("http://localhost:3001/temperament");
       dispatch({ type: GET_TEMPERAMENTS, payload: res.data});
    }
};

export function filterByTemp( payload ){
    return {
        type: FILTER_BY_TEMP,
        payload,
    }
};

export function filterByOrigin( payload ){
    return {
        type: FILTER_BY_ORIGIN,
        payload,
    }
};