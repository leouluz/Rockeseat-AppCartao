import 'react-native-gesture-handler'
import React from 'react';

import { StatusBar } from 'expo-status-bar';
// yarn add intl - apenas para o funcionamento do android
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

//expo install expo-app-loading
import AppLoading from 'expo-app-loading'

import { ThemeProvider } from 'styled-components';

//instalado com expo install expo-font @expo-google-fonts/NOMEDAFONTE
import {
  //hooks para usar as fonts
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins'


import theme from './src/global/style/theme';

import { NavigationContainer } from '@react-navigation/native'

import AppRoutes from './src/routes/app.routes';

export default function App() {
  const [fontsLoad] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoad) {
    return <AppLoading />
  }

  return (
    //theme provider é um components que envolve o projeto para que dar acesso ao tema
    <ThemeProvider theme={theme}>
      <NavigationContainer>
      <StatusBar
        barStyle="light-content" />
        <AppRoutes />
      </NavigationContainer>
    </ThemeProvider>
  )
}

