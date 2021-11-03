import React, {useState, useEffect} from 'react';
import {Text, Dimensions, Image, View, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {dark, light} from '../constants/colors';
import {
  addFavoritePokemons,
  removeFavoritePokemons,
} from '../redux/pokemon/api';
Icon.loadFont();
const DetailHeader = ({color, onPressBack}) => {
  const dispatch = useDispatch();
  const {width, height} = Dimensions.get('screen');
  const pokemon = useSelector(state => state.pokemon.pokemon);
  const isDarkTheme = useSelector(state => state.pokemon.isDarkTheme);
  const colors = isDarkTheme ? dark : light;
  const [screenWidth, setScreenWidth] = useState(width);
  const [screenHeight, setScreenHeight] = useState(height);

  useEffect(() => {
    Dimensions.addEventListener('change', ({window: {width, height}}) => {
      if (width < height) {
        setScreenWidth(width);
        setScreenHeight(height);
      } else {
        setScreenWidth(width);
        setScreenHeight(height);
      }
    });
  }, []);

  return (
    <View style={{flex: 1}}>
      {Object.keys(pokemon).length > 0 && (
        <View
          style={{
            flex: 1,
            backgroundColor: color,
            width: screenWidth,
            height: screenHeight / 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginLeft: 17,
              marginRight: 17,
              marginTop: 15,
            }}>
            <Icon
              onPress={onPressBack}
              size={30}
              color={colors.text}
              name={'arrow-back'}
            />
            <Icon
              onPress={() => {
                if (pokemon.isFavorite) {
                  Alert.alert("Favorilerden kaldırıldı.")
                  dispatch(removeFavoritePokemons());
                } else {
                  Alert.alert("Favorilere eklendi.")
                  dispatch(addFavoritePokemons());
                }
              }}
              size={30}
              color={colors.text}
              name={pokemon.isFavorite ? 'heart' : 'heart-outline'}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 26, color: colors.text, fontWeight: 'bold'}}>
              {pokemon.name.toUpperCase()}
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: 5,
            }}>
            {pokemon.types.map((item, i) => {
              return (
                <View
                  key={i}
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    borderRadius: 15,
                    marginBottom: 2,
                    marginTop: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 5,
                    padding: 4,
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
              position: 'absolute',
              width: screenWidth * 0.23,
              height: screenWidth * 0.23,
              top: screenWidth * 0.3,
              right: screenWidth * 0.4,
            }}>
            <Image
              style={{width: 200, height: 200, alignSelf: 'center'}}
              source={{
                uri: pokemon.sprites.other['official-artwork'].front_default,
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default DetailHeader;
