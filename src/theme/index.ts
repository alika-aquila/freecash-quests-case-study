import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const colors = {
  bg: {
    page: '#141523',
    container: '#252539',
    elevated: '#525266',
    border: '#33334D',
  },
  brand: {
    green: '#01D676',
    greenHover: '#00BF66',
    greenLight: '#71FFC0',
  },
  text: {
    white: '#FFFFFF',
    muted: '#A9A9CA',
  },
  gold: {
    base: '#FFC700',
    light: '#FFE177',
  },
  silver: {
    light: '#E3E3E3',
    dark: '#A6A6A6',
  },
  bronze: {
    light: '#FFCC95',
    dark: '#E77C0B',
  },
  status: {
    error: '#DE2C2C',
    warning: '#FFC700',
  },
  overlay: 'rgba(20, 21, 35, 0.6)',
};

const fonts = {
  heading: `'Poppins', system-ui, sans-serif`,
  body: `'Poppins', system-ui, sans-serif`,
};

const textStyles = {
  headingSm: {
    fontSize: '24px',
    lineHeight: '36px',
    fontWeight: 700,
    letterSpacing: '0.02em',
  },
  headingXs: {
    fontSize: '20px',
    lineHeight: '30px',
    fontWeight: 700,
    letterSpacing: '0.02em',
  },
  textXl: { fontSize: '18px', lineHeight: '27px' },
  textLg: { fontSize: '16px', lineHeight: '24px' },
  textMd: { fontSize: '14px', lineHeight: '21px' },
  textSm: { fontSize: '12px', lineHeight: '18px' },
  textXs: { fontSize: '10px', lineHeight: '15px' },
};

const styles = {
  global: {
    'html, body': {
      bg: '#141523',
      color: '#FFFFFF',
      fontFamily: `'Poppins', system-ui, sans-serif`,
      minHeight: '100vh',
    },
    '*': {
      boxSizing: 'border-box',
    },
  },
};

const theme = extendTheme({
  config,
  colors,
  fonts,
  textStyles,
  styles,
});

export default theme;
