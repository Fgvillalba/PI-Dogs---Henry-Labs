import {GET_DOGS, GET_TEMPERAMENTS} from '../actions'

const initialState = {
    dogs: [],
    temperaments: [],
    movieDetail: undefined
};

function rootReducer(state = initialState, {type, payload}){
  switch(type) {
    case GET_DOGS: {
       return {
          ...state,
          dogs: payload      
       } 
    }
    case GET_TEMPERAMENTS: {
      return {
        ...state,
        temperaments: payload,
      }
    }
    default: {
        return state;
    }
  }  
};

export default rootReducer;