import axios from 'axios';
export const GET_DOGS = "GET_DOGS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_BY_ID = "GET_BY_ID"
export const FILTER_BY_TEMP = "FILTER_BY_TEMP";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const CLEAR = "CLEAR";
export const POST_BREED = "POST_BREED";


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

export function getById(payload){
    return async function(dispatch) {
        var res = await axios.get(`http://localhost:3001/dogs/${payload}`);
        dispatch({ type: GET_BY_ID, payload: res.data});
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

export function orderByWeight( payload ){
    return {
        type: ORDER_BY_WEIGHT,
        payload,
    }
};

export function orderByName( payload ){
    return {
        type: ORDER_BY_NAME,
        payload,
    }
};

export function clear(){
    return {
        type: CLEAR,   
    }
};

export function postBreed(payload){
    return async function(dispatch) {
        var res = await axios.post("http://localhost:3001/dog/", payload);
        return res;
     }
};