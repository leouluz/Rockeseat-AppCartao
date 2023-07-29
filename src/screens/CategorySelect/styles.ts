import { RFValue } from "react-native-responsive-fontsize";

import theme from '../../global/style/theme' 
import styled from "styled-components/native";

import {Feather} from '@expo/vector-icons'

import { GestureHandlerRootView } from 'react-native-gesture-handler'

interface CategoryProps {
  isActive: boolean;
}


export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(113)}px;

  background-color: ${({theme}) => theme.colors.primary};

  align-items: center;
  justify-content: flex-end;

  padding-bottom: 19px;

`;

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: 18px;

  color: ${({theme}) => theme.colors.shape};
  

`;

export const Category = styled.TouchableOpacity<CategoryProps>`
  width: 100%;
  padding: ${RFValue(14)}px;

  flex-direction: row;
  align-items: center;

  background-color: ${({ isActive }) => 
    isActive ? theme.colors.secondary_light : theme.colors.background
  };

`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  margin-right: 16px;
  color: ${({theme}) => theme.colors.text_dark};
`;

export const Name = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.text_dark};
`;

export const Separetor = styled.View`
  height: 1px;
  width: 100%;

  background-color: ${({theme}) => theme.colors.text};
`;

export const Footer = styled.View`
  width: 100%;
  padding: 24px;
`;
