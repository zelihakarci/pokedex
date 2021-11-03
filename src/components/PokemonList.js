import React, {useState, useEffect} from 'react';
import {FlatList, View, Text, Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getPokemons} from '../redux/pokemon/api';
import Spinner from './Spinner';
import PokemonItem from './PokemonItem';
import {ScrollView} from 'react-native-gesture-handler';

const PokemonList = () => {
  const dispatch = useDispatch();
  const spinner = useSelector(state => state.pokemon.spinner);
  const nextUrl = useSelector(state => state.pokemon.nextUrl);
  const pokemonList = useSelector(state => state.pokemon.pokemonList);
  useEffect(() => {
    dispatch(getPokemons(nextUrl));
  }, [dispatch]);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {spinner ? (
        <Spinner />
      ) : (
        <ScrollView
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
          onMomentumScrollEnd={e => {
            const scrollPosition = e.nativeEvent.contentOffset.y;
            const scrollViewHeight = e.nativeEvent.layoutMeasurement.height;
            const contentHeight = e.nativeEvent.contentSize.height;
            const isScrolledBottom = scrollViewHeight + scrollPosition;

            if (isScrolledBottom >= contentHeight - 50) {
              dispatch(getPokemons(nextUrl));
            }
          }}>
          {pokemonList.map((item, index) => {
            return (
              <View style={{width: '50%', flexDirection: 'row'}}>
                <PokemonItem data={item} index={index} />
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

export default PokemonList;
