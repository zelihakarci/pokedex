import {
  GET_POKEMON_LIST,
  SPINNER,
  SET_POKEMON,
  SET_CATCH_POKEMON,
  ADD_FAVORITES,
  REMOVE_FAVORITES,
  DELETE_POKEMONS,
  IS_DARK_THEME,
} from './constants';

export const getPokemonList = (pokemonData, nextUrl) => ({
  type: GET_POKEMON_LIST,
  payload: {data: pokemonData, nextUrl: nextUrl},
});

export const spinner = val => ({
  type: SPINNER,
  payload: {val},
});

export const setPokemon = val => ({
  type: SET_POKEMON,
  payload: {val},
});

export const setCatchPokemon = val => ({
  type: SET_CATCH_POKEMON,
  payload: {data: val},
});

export const addFavorites = () => ({
  type: ADD_FAVORITES,
});

export const removeFavorites = () => ({
  type: REMOVE_FAVORITES,
});

export const deletePokemonList = () => ({
  type: DELETE_POKEMONS,
  payload: [],
});

export const isDarkTheme = val => ({
  type: IS_DARK_THEME,
  payload: val,
});
