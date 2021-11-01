import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useTheme } from 'styled-components';

import { Register } from '../screens/Register';
import { Dashboard } from '../screens/Dashboard';

const { Navigator, Screen } = createBottomTabNavigator();

export default function AppRoutes() {
  const theme = useTheme();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor:theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle:{
          height: 88,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0 
        }
      }}
    >
      <Screen 
        name="Listagem"
        component={Dashboard}
      />
      <Screen 
        name="Register"
        component={Register}
      />
      <Screen 
        name="Resumo"
        component={Register}
      />
    </Navigator>
  );
}
