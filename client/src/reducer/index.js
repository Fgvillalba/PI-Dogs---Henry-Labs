import {GET_DOGS, GET_TEMPERAMENTS, GET_BY_NAME, FILTER_BY_TEMP, FILTER_BY_ORIGIN } from '../actions'

const initialState = {
    dogs: [],
    temperaments: [],
    dogsCopy: [],
};

function rootReducer(state = initialState, {type, payload}){
  switch(type) {
    case GET_DOGS: 
       return {
          ...state,
          dogs: payload,
          dogsCopy: payload      
       }
    case GET_BY_NAME: 
       return {
        ...state,
        dogs: payload  
       }   
    case GET_TEMPERAMENTS: 
      return {
        ...state,
        temperaments: payload,
      }
    case FILTER_BY_TEMP: 
      const filterTemp = state.dogsCopy.filter((b) => b.temperaments?.includes(payload))
      return {
        ...state,
        dogs: filterTemp
      }
    case FILTER_BY_ORIGIN: 
      const filterBreeds = payload === "created"? 
      state.dogsCopy.filter((b) => b.createdAt !== undefined)
      : state.dogsCopy.filter((b) => b.createdAt === undefined )
      return {
        ...state,
        dogs: payload === "all" ? state.dogsCopy : filterBreeds
      }  

    default: 
        return state;
  }  
};

export default rootReducer;