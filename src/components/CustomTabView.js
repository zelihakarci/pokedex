import * as React from 'react';
import {View, useWindowDimensions, Text} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {useSelector} from 'react-redux';
import {dark, light} from '../constants/colors';
import About from './About';
import BaseStats from './BaseStats';
let progressColor = '#fffff';
const FirstRoute = () => <About />;

const SecondRoute = () => <BaseStats progressColor = {progressColor}/>;

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});
const CustomTabView = ({color}) => {
  const isDarkTheme = useSelector(state => state.pokemon.isDarkTheme);
  const colors = isDarkTheme ? dark : light;
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'About'},
    {key: 'second', title: 'Base Stats'},
  ]);
  progressColor = color;
  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={props => (
        <TabBar
          {...props}
          renderLabel={({route, color}) => (
            <Text style={{color: colors.textSecondary, fontSize: 15, margin: 8}}>
              {route.title}
            </Text>
          )}
          style={{
            backgroundColor: colors.background,
            borderTopStartRadius: 30,
            borderTopEndRadius: 30,
            padding: 10,
          }}
        />
      )}
    />
  );
};
export default CustomTabView;
