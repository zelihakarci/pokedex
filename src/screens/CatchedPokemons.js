import React from 'react';
import {FlatList, View, SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import PokemonItem from '../components/PokemonItem';
import {dark, light} from '../constants/colors';
Icon.loadFont();
const CatchedPokemons = ({navigation}) => {
  const pokemonList = useSelector(state => state.pokemon.catchedPokemon);
  const isDarkTheme = useSelector(state => state.pokemon.isDarkTheme);
  const colors = isDarkTheme ? dark : light;
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{alignSelf: 'flex-start', margin: 20}}>
        <Icon
          onPress={() => {
            navigation.pop();
          }}
          size={30}
          color={colors.textSecondary}
          name={'arrow-back'}
        />
      </View>
      <FlatList
        numColumns={2}
        data={pokemonList}
        renderItem={({item, index}) => {
          return <PokemonItem data={item} index={index} />;
        }}
        keyExtractor={(item, i) => i.toString()}
      />
    </SafeAreaView>
  );
};

export default CatchedPokemons;
