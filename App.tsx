import 'react-native-gesture-handler'
import React from 'react';

import { StatusBar } from 'expo-status-bar';
// yarn add intl - apenas para o funcionamento do android
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

//expo install expo-app-loading
import AppLoading from 'expo-app-loading'

import { ThemeProvider } from 'styled-components';
import { AuthProvider, useAuth } from './src/hooks/auth'

//instalado com expo install expo-font @expo-google-fonts/NOMEDAFONTE
import {
  //hooks para usar as fonts
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins'

import { Signin }  from './src/screens/Signin'

import theme from './src/global/style/theme';

import { Routes } from './src/routes'

import { AppRoutes } from './src/routes/app.routes';

export default function App() {
  const [fontsLoad] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const { userStorageLoading } = useAuth();

  if (!fontsLoad || userStorageLoading) {
    return <AppLoading />
  }

  return (
    //theme provider é um components que envolve o projeto para que dar acesso ao tema
    <ThemeProvider theme={theme}>
      <StatusBar style="light"/>
        <AuthProvider>
          <Routes />
        </AuthProvider>
    </ThemeProvider>
  )
}

