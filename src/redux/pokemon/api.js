import {useAPI} from '../../hooks/useApi';
import {
  getPokemonList,
  spinner,
  setCatchPokemon,
  setPokemon,
  addFavorites,
  removeFavorites,
  deletePokemonList,
  isDarkTheme,
} from './actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '../store';
const {get} = useAPI();

export const getPokemons = nextUrl => async dispatch => {
  dispatch(spinner(true));
  try {
    let pokemonsData = [];
    let endPoint =
      nextUrl === null ? 'https://pokeapi.co/api/v2/pokemon?limit=10' : nextUrl;
    let response = await get({
      endpoint: endPoint,
    });
    let favorites = [];
    if (JSON.parse(await AsyncStorage.getItem('FavoritePokemons')) !== null) {
      favorites = JSON.parse(await AsyncStorage.getItem('FavoritePokemons'));
    }
    const getPokemonsDetail = async () => {
      for (let i = 0; i < response.data.results.length; i++) {
        let pokemonDetail = await get({
          endpoint: response.data.results[i].url,
        });
        let isFavorite = false;
        pokemonDetail.data['isFavorite'] = false;
        for (let j = 0; j < favorites.length; j++) {
          if (pokemonDetail.data.id === favorites[j].id) {
            isFavorite = true;
            pokemonDetail.data['isFavorite'] = true;
          }
        }
        pokemonsData.push(
          Object.assign(response.data.results[i], pokemonDetail.data),
        );
      }
    };

    await getPokemonsDetail();
    dispatch(getPokemonList(pokemonsData, response.data.next));
    dispatch(spinner(false));
  } catch (error) {
    dispatch(spinner(false));
    console.log('Hata!', error);
  }
};

export const setPokemonDetail = pokemon => dispatch => {
  dispatch(setPokemon(pokemon));
};

export const catchPokemon = val => async dispatch => {
  const _list = JSON.parse(await AsyncStorage.getItem('CatchedPokemons'));
  const caughtPokemonListStorage = _list !== null ? _list : [];

  let pokeArray = caughtPokemonListStorage;
  let isThere = true;
  for (let i = 0; i < caughtPokemonListStorage.length; i++) {
    if (caughtPokemonListStorage[i].id !== val.id) {
      isThere = false;
    } else {
      isThere = true;
      break;
    }
  }
  if (!isThere || caughtPokemonListStorage.length === 0) {
    pokeArray.push(val);
  } else {
    pokeArray = pokeArray.filter(item => {
      return item.id !== val.id;
    });
  }
  await AsyncStorage.setItem('CatchedPokemons', JSON.stringify(pokeArray));
  dispatch(setCatchPokemon(pokeArray));
};

export const getAsyncStoragePokemons = () => async dispatch => {
  const caughtPokemonListStorage = JSON.parse(
    await AsyncStorage.getItem('CatchedPokemons'),
  );
  dispatch(setCatchPokemon(caughtPokemonListStorage));
};

export const addFavoritePokemons = () => async dispatch => {
  dispatch(addFavorites());
  let newList = [];
  const presentPokemonList = store.getState().pokemon.pokemonList;
  const pokemon = store.getState().pokemon.pokemon;
  for (let i = 0; i < presentPokemonList.length; i++) {
    if (presentPokemonList[i].id === pokemon.id) {
      newList.push(pokemon);
    } else {
      newList.push(presentPokemonList[i]);
    }
  }
  dispatch(deletePokemonList());
  dispatch(getPokemonList(newList));
  let favoritePokemons = [];
  if (JSON.parse(await AsyncStorage.getItem('FavoritePokemons')) !== null) {
    favoritePokemons = JSON.parse(
      await AsyncStorage.getItem('FavoritePokemons'),
    );
  }

  favoritePokemons.push(pokemon);
  await AsyncStorage.setItem(
    'FavoritePokemons',
    JSON.stringify(favoritePokemons),
  );
};

export const removeFavoritePokemons = () => async dispatch => {
  dispatch(removeFavorites());
  let newList = [];
  const pokemon = store.getState().pokemon.pokemon;

  const presentPokemonList = store.getState().pokemon.pokemonList;

  for (let i = 0; i < presentPokemonList.length; i++) {
    if (presentPokemonList[i].id === pokemon.id) {
      newList.push(pokemon);
    } else {
      newList.push(presentPokemonList[i]);
    }
  }
  dispatch(deletePokemonList());
  dispatch(getPokemonList(newList));
  let favoritePokemons = JSON.parse(
    await AsyncStorage.getItem('FavoritePokemons'),
  );
  favoritePokemons = favoritePokemons.filter((item, i) => {
    return item.id !== pokemon.id;
  });
  await AsyncStorage.setItem(
    'FavoritePokemons',
    JSON.stringify(favoritePokemons),
  );
};

export const setDarkTheme = val => async dispatch => {
  dispatch(isDarkTheme(val));
};
