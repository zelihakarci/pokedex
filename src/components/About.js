import React, {useState, useEffect} from 'react';
import {Text, Dimensions, Image, View} from 'react-native';
import {useSelector} from 'react-redux';
import {dark, light} from '../constants/colors';
import LabeledText from './LabeledText';

const About = ({}) => {
  const pokemon = useSelector(state => state.pokemon.pokemon);
 
  return (
    <View style={{flex: 1}}>
      {Object.keys(pokemon).length !== 0 && (
        <View style={{flex: 1}}>
          <LabeledText label={'Weight'} value={pokemon.weight} />
          <LabeledText label={'Height'} value={pokemon.height} />
          <LabeledText
            label={'Base Experience'}
            value={pokemon.base_experience}
          />
          {pokemon.abilities.map((item, i) => {
            return (
              <LabeledText
                label={`Ability ${i + 1}`}
                value={item.ability.name}
              />
            );
          })}
        </View>
      )}
    </View>
  );
};
export default About;
