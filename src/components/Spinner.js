import React from 'react';
import {ActivityIndicator, View} from 'react-native';
const Spinner = ({...remainProps}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator color={'red'} {...remainProps} />
    </View>
  );
};

export default Spinner;
