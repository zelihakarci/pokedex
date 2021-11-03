import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getColorFromURL} from 'rn-dominant-color';
import {useDispatch, useSelector} from 'react-redux';
import {catchPokemon} from '../redux/pokemon/api';
import {dark, light} from '../constants/colors';

const PokemonItem = ({data, index}) => {
  const nav = useNavigation();
  const dispatch = useDispatch();
  const isDarkTheme = useSelector(state => state.pokemon.isDarkTheme);
  const colors = isDarkTheme ? dark : light;
  const {width, height} = Dimensions.get('screen');
  const [screenWidth, setScreenWidth] = useState(width);
  const [color, setColor] = useState('#ffffff');

  useEffect(() => {
    setBackGroundColor();
    Dimensions.addEventListener('change', ({window: {width, height}}) => {
      if (width < height) {
        setScreenWidth(width);
      } else {
        setScreenWidth(width);
      }
    });
  }, []);

  const setBackGroundColor = () => {
    getColorFromURL(data.sprites.other['official-artwork'].front_default).then(
      itemColors => {
        setColor(
          Platform.OS === 'android' ? itemColors.primary : itemColors.detail,
        );
      },
    );
  };

  return (
    <TouchableOpacity
      key={index}
      style={{
        ...styles.container,
        width: screenWidth * 0.45,
        height: screenWidth * 0.35,
        backgroundColor: color,
      }}
      onPress={() => {
        nav.navigate('DetailScreen', {data, color});
      }}>
      <View style={{position: 'absolute', top: 17, left: 10}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: colors.text, fontWeight: 'bold', fontSize: 17}}>
            {data.name.toUpperCase()}
          </Text>
          <TouchableOpacity
            onPress={() => {
              dispatch(catchPokemon(data));
            }}
            style={{
              position: 'absolute',
              left: screenWidth / 3.2,
            }}>
            <Image
              style={{width: 30, height: 30}}
              source={require('../assets/images/pokeball.gif')}
            />
          </TouchableOpacity>
        </View>

        {data.types.map((item, i) => {
          return (
            <View
              key={i}
              style={{
                ...styles.typeContainer,
                width: screenWidth * 0.14,
              }}>
              <Text
                style={{
                  color: colors.text,
                  alignContent: 'center',
                  fontSize: 12,
                }}>
                {item.type.name}
              </Text>
            </View>
          );
        })}
      </View>
      <View
        style={{
          ...styles.imageContainer,
          width: screenWidth * 0.23,
          height: screenWidth * 0.23,
          borderRadius: screenWidth * 0.23,
          top: screenWidth * 0.12,
          left: screenWidth * 0.22,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{width: 100, height: 100, alignSelf: 'center'}}
          source={{
            uri: data.sprites.other['official-artwork'].front_default,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 15,
    position: 'relative',
  },
  typeContainer: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 15,
    marginBottom: 2,
    marginTop: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    padding: 4,
  },
  imageContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});

export default PokemonItem;
