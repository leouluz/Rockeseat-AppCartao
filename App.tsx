import React from 'react';
import AppLoading from 'expo-app-loading' //expo install expo-app-loading

import { ThemeProvider } from 'styled-components';
import { //instalado com expo install expo-font @expo-google-fonts/NOMEDAFONTE
  useFonts, //hooks para usar as fonts
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins'


import theme from './src/global/style/theme';

import { Dashboard } from './src/screens/Dashboard/index';
import { Register } from './src/screens/Register/index';

export default function App() {
  const [fontsLoad] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if(!fontsLoad){
    return <AppLoading/>
  }

  return (
    //theme provider é um components que envolve o projeto para que dar acesso ao tema
    <ThemeProvider theme={theme}>
      <Register/>
    </ThemeProvider>
  )
}

