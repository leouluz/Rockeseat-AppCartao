import React from "react";
import { render } from '@testing-library/react-native'

import { Input } from '.'

import { ThemeProvider } from 'styled-components/native';
import theme from '../../../global/style/theme';

// PARA UTILIZAR O JEST COM STYLED COMPONENT
// yarn add --dev jest-styled-components

// Provider é uma constante que recebe um componente
// para que eu possa embrulhar o componente de teste
const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
)

// Nos testes eu posso passar um segundo parametro
// que é um objetivo com um componente que irá 
// embrulhar o componente principal de teste
describe('Input component',  () => {
  it('must have specific border color when active', () =>{
    const { getByTestId } = render(
      // Criando um component com as configurações 
      // que eu desejo ser testado
      <Input 
        testID="input-email"
        placeholder="E-mail"
        keyboardType="email-address"
        autoCorrect={false}
      />,
      {
        wrapper: Providers
      }
    )

    const inputComponent = getByTestId('input-email');
    expect(inputComponent.prps.style[0].borderColor)
    .toEqual(theme.colors.attention)

    expect(inputComponent.prps.style[0].borderWidth)
    .toEqual(3)

  })
})