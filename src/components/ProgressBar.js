import React, {useState, useEffect} from 'react';
import * as Progress from 'react-native-progress';

const ProgressBar = ({progressValue, color}) => {
  return (
    <Progress.Bar
      color={color}
      progress={progressValue}
      width={160}
      height={2}
    />
  );
};
export default ProgressBar;
