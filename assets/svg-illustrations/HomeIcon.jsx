// components/icons/HomeIcon.js
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const HomeIcon = ({ width = 24, height = 24, fill = 'black' }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z" fill={fill} />
  </Svg>
);

export default HomeIcon;
