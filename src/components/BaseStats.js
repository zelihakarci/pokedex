import * as React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import ProgressBar from './ProgressBar';

const BaseStats = ({progressColor}) => {
  const pokemon = useSelector(state => state.pokemon.pokemon);

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      {pokemon.stats.map((item, i) => {
        return (
          <View
            key={i}
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexDirection: 'row',
              margin: 20,
            }}>
            <View style={{flex: 1.4}}>
              <Text style={{alignContent: 'flex-start'}}>{item.stat.name}</Text>
            </View>

            <View style={{flex: 1}}>
              <Text style={{alignContent: 'flex-start'}}>{item.base_stat}</Text>
            </View>
            <View style={{flex: 2}}>
              <ProgressBar
                progressValue={item.base_stat / 100}
                color={progressColor}
              />
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default BaseStats;
