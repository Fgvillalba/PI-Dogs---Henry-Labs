import {
  GET_DOGS,
  GET_TEMPERAMENTS,
  GET_BY_NAME,
  FILTER_BY_TEMP,
  FILTER_BY_ORIGIN,
  ORDER_BY_WEIGHT,
  ORDER_BY_NAME,
  GET_BY_ID,
  CLEAR,
  POST_BREED,
  SET_ACTUAL_PAGE,
} from "../actions";

const initialState = {
  dogs: [],
  temperaments: [],
  dogsCopy: [],
  breedDetail: undefined,
  actualPage: 1,
};

function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: payload,
        dogsCopy: payload,
      };
    case GET_BY_NAME:
      return {
        ...state,
        dogs: payload,
      };
    case GET_BY_ID:
      return {
        ...state,
        breedDetail: payload,
      };
    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: payload,
      };
    case POST_BREED:
      return {
        ...state,
      };
    case FILTER_BY_TEMP:
      const filterTemp = state.dogsCopy.filter((b) =>
        b.temperaments?.includes(payload)
      );
      return {
        ...state,
        dogs: payload === "All" ? state.dogsCopy : filterTemp,
      };
    case FILTER_BY_ORIGIN:
      const filterBreeds =
        payload === "created"
          ? state.dogsCopy.filter((b) => b.createdAt !== undefined)
          : state.dogsCopy.filter((b) => b.createdAt === undefined);
      return {
        ...state,
        dogs: payload === "all" ? state.dogsCopy : filterBreeds,
      };
    case ORDER_BY_WEIGHT:
      const orderByWeight =
        payload === "wAsc"
          ? [...state.dogs].sort((a, b) => {
              if (parseInt(a.weight) > parseInt(b.weight)) return 1;
              if (parseInt(a.weight) < parseInt(b.weight)) return -1;
              return 0;
            })
          : [...state.dogs].sort((a, b) => {
              if (parseInt(a.weight) > parseInt(b.weight)) return -1;
              if (parseInt(a.weight) < parseInt(b.weight)) return 1;
              return 0;
            });
      return {
        ...state,
        dogs: orderByWeight,
      };
    case ORDER_BY_NAME:
      const orderByName =
        payload === "az"
          ? [...state.dogs].sort((a, b) => {
              const aName = a.name.toLowerCase();
              const bName = b.name.toLowerCase();
              if (aName > bName) return 1;
              if (aName < bName) return -1;
              return 0;
            })
          : [...state.dogs].sort((a, b) => {
              const aName = a.name.toLowerCase();
              const bName = b.name.toLowerCase();
              if (aName > bName) return -1;
              if (aName < bName) return 1;
              return 0;
            });
      return {
        ...state,
        dogs: orderByName,
      };
    case CLEAR:
      return {
        ...state,
        breedDetail: undefined,
        dogs: [],
      };
    case SET_ACTUAL_PAGE:
      return {
        ...state,
        actualPage: payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
