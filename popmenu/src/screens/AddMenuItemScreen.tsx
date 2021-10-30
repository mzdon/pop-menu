import React from 'react';

import Spacer from 'components/Spacer';
import Text from 'components/Text';
import {commonStyles} from 'styles';

const AddMenuItemScreen = () => {
  return (
    <>
      <Spacer />
      <Text style={commonStyles.padding}>Add Menu Item</Text>
      <Spacer />
    </>
  );
};

export default AddMenuItemScreen;
