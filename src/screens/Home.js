import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import PokemonList from '../components/PokemonList';
import Header from '../components/Header';
import SettingsModal from '../components/SettingsModal';
import {getAsyncStoragePokemons} from '../redux/pokemon/api';
import {dark, light} from '../constants/colors';

const Home = () => {
  const dispatch = useDispatch();
  const isDarkTheme = useSelector(state => state.pokemon.isDarkTheme);
  const colors = isDarkTheme ? dark : light;
  useEffect(() => {
    dispatch(getAsyncStoragePokemons());
  }, [dispatch]);
  const [visibleSettings, setVisibleSettings] = useState(false);
  return (
    <View style={{flex: 1, marginTop: 50, backgroundColor: colors.background}}>
      <Header
        onPressSettings={() => {
          setVisibleSettings(!visibleSettings);
        }}
      />
      <PokemonList />
      {visibleSettings && (
        <SettingsModal
          modalVisible={visibleSettings}
          setModalVisible={setVisibleSettings}
        />
      )}
    </View>
  );
};

export default Home;
