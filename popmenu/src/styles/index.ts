import {TextStyle, ViewStyle, useColorScheme} from 'react-native';

export const basePadding = 10;
export const baseFontSize = 16;

export const commonStyles: Record<string, ViewStyle> = {
  flex1: {
    flex: 1,
  },
  padding: {
    paddingHorizontal: basePadding,
  },
  shadow: {
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 1,
      height: 2,
    },
  },
};

export const textStyles: Record<string, TextStyle> = {
  header: {
    fontSize: baseFontSize * 1.5,
    fontWeight: '600',
  },
  subHeader: {
    fontSize: baseFontSize * 1.25,
    fontWeight: '600',
  },
  base: {
    fontSize: baseFontSize,
    fontWeight: '400',
  },
  baseBold: {
    fontSize: baseFontSize,
    fontWeight: '500',
  },
  subText: {
    fontSize: baseFontSize * 0.9,
    fontWeight: '400',
    fontStyle: 'italic',
  },
};

interface Theme {
  backgroundColor: string;
  textColor: string;
  greyColor: string;
  ctaColor: string;
  errorColor: string;
  isDark: boolean;
}

const offWhite = '#FAFAFA';
const offBlack = '#222222';
const ctaColor = '#4385F2';
const errorColor = '#C34F4D';

const darkTheme = {
  backgroundColor: offBlack,
  textColor: offWhite,
  greyColor: '#BBBBBB',
  ctaColor,
  errorColor,
  isDark: true,
};

const lightTheme = {
  backgroundColor: offWhite,
  textColor: offBlack,
  greyColor: '#999999',
  ctaColor,
  errorColor,
  isDark: false,
};

export const useTheme = (): Theme => {
  const isDarkMode = useColorScheme() === 'dark';

  return isDarkMode ? darkTheme : lightTheme;
};
