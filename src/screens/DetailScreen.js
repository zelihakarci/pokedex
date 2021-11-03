import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, Text, SafeAreaView} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setPokemonDetail} from '../redux/pokemon/api';
import DetailHeader from '../components/DetailHeader';
import CustomTabView from '../components/CustomTabView';

const DetailScreen = ({navigation}) => {
  const route = useRoute();
  const dispatch = useDispatch();
  const pokemon = route.params.data;
  const color = route.params.color;
  useEffect(() => {
    dispatch(setPokemonDetail(pokemon));
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <DetailHeader
          color={color}
          onPressBack={() => {
            navigation.pop();
          }}
        />
        <CustomTabView color={color} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DetailScreen;
