import React from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {dark, light} from '../constants/colors';

const LabeledText = ({label, value}) => {
  const isDarkTheme = useSelector(state => state.pokemon.isDarkTheme);
  const colors = isDarkTheme ? dark : light;

  return (
    <View style={{flex: 1, padding: 8, flexDirection: 'row', margin: 10}}>
      <Text style={{flex: 2, color: colors.labelText}}>{label}</Text>
      <Text style={{flex: 1, color: colors.textSecondary}}>{value}</Text>
    </View>
  );
};

export default LabeledText;
