import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions, Image} from 'react-native';
import {dark, light} from '../constants/colors';
import {useSelector} from 'react-redux';

import Icon from 'react-native-vector-icons/Feather';
Icon.loadFont();
const Header = ({onPressSettings}) => {
  const isDarkTheme = useSelector(state => state.pokemon.isDarkTheme);
  const colors = isDarkTheme ? dark : light;
  return (
    <View
      style={{
        marginTop: 15,
        marginBottom: 30,
        marginLeft: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 20,
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 30, fontWeight: 'bold', color: colors.textSecondary}}>
        Pokedex
      </Text>
      <Icon
        onPress={onPressSettings}
        size={30}
        color={colors.textSecondary}
        name={'menu'}
      />
    </View>
  );
};

export default Header;
