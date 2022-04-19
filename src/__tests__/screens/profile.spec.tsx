import React from "react";

import { render } from '@testing-library/react-native'

import { Signin } from '../../screens/Signin'

// PARA UTILIZAR O JEST COM STYLED COMPONENT
// yarn add --dev jest-styled-components

// Describe é utilizado para separar por grupos de testes
// nele é necessario 2 parametros
// String com o nome do grupo ou da separação
// uma função com os testes

describe('GroupTest: Profile',  () => {

  // Podemos trocar a função test por it
  // apenas uma questão de semantica ou preferencia do time.

  it('testing select with getByPlaceholderText using toBeTruthy', () => {
    const { debug, getByPlaceholderText } = render(<Signin />)
  
    // getByPlaceholderText encontra um component que tenha o 
    // placeholder que foi passado como parametro
    const inuptName = getByPlaceholderText('Nome')
  
    // expect consegui encontrar as propriedades do component.
    // toBeTruthy verifica se ele foi encontrado ou se existe na tela.
    // expect(inuptName.props.placeholder).toBeTruthy();
    expect(inuptName).toBeTruthy();
    
    // Debug me tras todas informações do componente renderizado
    debug();
  })
  
  test('testing select with testID using toEqual', () => {
    const { getByTestId } = render(<Signin />)
  
    // getByTestId consegui acessar o id de test de um componente
    // Prop do component TestID
    const inuptSurname = getByTestId('iunput-surname');
  
  
    // toEqual consegui comparar se o valor do componente é o 
    // mesmo esperado pelo que passei como parametro.
    expect(inuptSurname.props.value).toEqual('Leonardo');
  
  })
  
  test('testing select with testID using toContain', () => {
    const { getByTestId } = render(<Signin />)
  
    // getByTestId consegui acessar o id de test de um componente
    // Prop do component TestID
    const titleText = getByTestId('title-text');
  
    // toContain consegui acessar o que tem dentro do componente selecionado
    // caso o elemento não tenha expecificado o children ele trará o valores de componente renderizados
    expect(titleText.props.children).toContain('Perfil');
  })
})
