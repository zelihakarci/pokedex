import React from 'react';
import {Modal, View, TouchableOpacity, Text, Image, Switch} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import {dark, light} from '../constants/colors';
import {setDarkTheme} from '../redux/pokemon/api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFont from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
Icon.loadFont();
IconFont.loadFont();
MaterialCommunityIcons.loadFont();
const SettingsModal = ({modalVisible, setModalVisible, ...remainProps}) => {
  const nav = useNavigation();
  const dispatch = useDispatch();
  const isDarkTheme = useSelector(state => state.pokemon.isDarkTheme);
  const colors = isDarkTheme ? dark : light;

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 200,
              height: '45%',
              backgroundColor: colors.background,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{width: 60, height: 60, margin: 20}}
              source={require('../assets/images/pokeball.gif')}
            />
            <FlatList
              data={[
                {
                  id: 1,
                  title: 'Yakalananlar',
                  icon: (
                    <Icon
                      size={30}
                      color={colors.textSecondary}
                      name={'pokeball'}
                    />
                  ),
                  onPress: () => {
                    setModalVisible(false)
                    nav.navigate('CatchedPokemons');
                  },
                  isSwitch: false,
                },
                {
                  id: 2,
                  title: 'Tema',
                  icon: (
                    <MaterialCommunityIcons
                      size={30}
                      color={colors.textSecondary}
                      name={'theme-light-dark'}
                    />
                  ),
                  onPress: () => {},
                  isSwitch: true,
                },
              ]}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={{
                      borderColor: 'gray',
                      borderWidth: 1,
                      width: 200,
                      padding: 20,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                    }}
                    onPress={item.onPress}>
                    {item.icon}
                    <Text style={{color: colors.textSecondary, fontSize: 18}}>
                      {item.title}
                    </Text>
                    {item.isSwitch && (
                      <Switch
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        thumbColor={'#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => {
                          dispatch(setDarkTheme(!isDarkTheme));
                        }}
                        value={isDarkTheme}
                      />
                    )}
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item, i) => i.toString()}
            />
            <TouchableOpacity
              style={{
                width: 90,
                padding: 10,
                margin: 10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'gray',
                borderRadius: 15,
              }}
              onPress={() => {
                setModalVisible(false);
              }}>
              <Text style={{color: 'white', fontSize: 18}}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SettingsModal;
