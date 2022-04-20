// yarn add @testing-library/react-hooks -d
// Para testar os hooks react

import React from "react";

import { renderHook, act } from '@testing-library/react-hooks'

// yarn add ts-jest -D
import { mocked } from 'ts-jest/utils'

import { AuthProvider, useAuth } from './auth'

import { logInAsync } from 'expo-google-app-auth'


// Para utilizar mock's personalizados devemos instalar
// yarn add ts-jest -D

// Mock é usado para sobreescrever funções
// É utilizada para funções que dependem de ações externas
// Ou internet, etc...
// Primeiro parametro é a lib que sera sobre escrita 
// Segundo parametro é uma função de sobreescrever o resultado retornado
// RESCREVER DE ACORDO COM O COMPORTAMENTO DA LIB

  jest.mock('expo-google-app-auth');

// MOCK GLOBAL 
// jest.mock('expo-google-app-auth', () =>{
//   return {
//     logInAsync: () =>{
//       return {
//         type:'sucess',
//         user:{
//           id: 'any_id',
//           email: 'leonardo@email.com',
//           name: 'Leonardo',
//           photo: 'any_photo.png'
//         }
//       }
//     }
//   }
// })

describe('GroupTest: Auth Hook',  () => {

  // Podemos trocar a função test por it
  // apenas uma questão de semantica ou preferencia do time.

  it('should be able to sign in with google account existing', async () => {
    // Funções que atualizam estados precisam ser embrulhadas
    // por um act

    //Funções async await precisam estar em testes async await
    await act(() => result.current.signInWithGoogle());

    expect(result.current.user.email).toBe('leonardo@email.com');

  })

  it('should be able to sign in with google account existing', async () => {

    const googleMocked = mocked(logInAsync);
    // MOCK PERSONALIZADO PARA ESTE TESTE
    googleMocked.mockReturnValue({
      type:'cancel'
    })

    const { result } = renderHook(() => 
      useAuth(),{
        wrapper: AuthProvider
      }
    )

    const { result } = renderHook(() => 
      useAuth(),{
        wrapper: AuthProvider
      }
    )

    // Funções que atualizam estados precisam ser embrulhadas
    // por um act

    //Funções async await precisam estar em testes async await
    await act(() => result.current.signInWithGoogle());

    // Aqui verificamos se não existe uma propriedade email dentro de user
    expect(result.current.user).not.toHaveProperty('email');

    // Aqui verificamos se existe uma propriedade email dentro de user
    expect(result.current.user).toHaveProperty('email');

  })
})