import {
  GET_POKEMON_LIST,
  SPINNER,
  SET_CATCH_POKEMON,
  SET_POKEMON,
  ADD_FAVORITES,
  REMOVE_FAVORITES,
  DELETE_POKEMONS,
  IS_DARK_THEME,
} from './constants';

const initialState = {
  pokemonList: [],
  nextUrl: null,
  spinner: false,
  catchedPokemon: {},
  pokemon: {},
  isDarkTheme: false,
};

export default (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case GET_POKEMON_LIST:
      return {
        ...state,
        pokemonList: [...state.pokemonList, ...payload.data],
        nextUrl: payload.nextUrl,
      };
    case SPINNER:
      return {
        ...state,
        spinner: payload.val,
      };
    case SET_CATCH_POKEMON:
      return {
        ...state,
        catchedPokemon: payload.data,
      };
    case SET_POKEMON:
      return {
        ...state,
        pokemon: payload.val,
      };
    case ADD_FAVORITES:
      return {
        ...state,
        pokemon: {...state.pokemon, isFavorite: true},
      };
    case REMOVE_FAVORITES:
      return {...state, pokemon: {...state.pokemon, isFavorite: false}};
    case DELETE_POKEMONS:
      return {...state, pokemonList: payload};
    case IS_DARK_THEME:
      return {
        ...state,
        isDarkTheme: payload,
      };
    default:
      return state;
  }
};
