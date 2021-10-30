import React from 'react';

import {View} from 'react-native';
import {basePadding} from 'styles';

interface Props {
  heightScale?: number;
}

const Spacer = ({heightScale = 1}: Props): React.ReactElement<Props> => (
  <View style={{height: heightScale * basePadding}} />
);

export default Spacer;
