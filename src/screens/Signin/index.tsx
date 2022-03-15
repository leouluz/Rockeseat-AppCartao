import React, { useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

import { SignInSocialButton } from '../../components/SigninSocialButton'

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SigninTitle,
  Footer,
  FooterWrapper,
} from './styles'
import { ActivityIndicator, Alert } from 'react-native';
import theme from '../../global/style/theme';

export function Signin() {
  const [isLoading, setIsLoading] = useState(false)
  const { signInWithGoogle, signInWithApple } = useAuth();

  async function handleSignInWithGoogle(){
    try{
      setIsLoading(true);
      return await signInWithGoogle();
    } catch ( error ) {
      console.log(error);
      Alert.alert('Não foi possivel conectar a conta google')
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSignInWithApple(){
    try{
      setIsLoading(true);
      return await signInWithApple();
    } catch ( error ) {
      console.log(error);
      Alert.alert('Não foi possivel conectar a conta Apple')
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container>
     <Header>
       <TitleWrapper>
         <LogoSvg
         width={RFValue(120)}
         height={RFValue(68)}
         />
         <Title>
           Controle suas {'\n'}
           finanças de forma {'\n'}
           muito simples
         </Title>
       </TitleWrapper>
       <SigninTitle>
         Faça seu login com {'\n'}
         uma das contas abaixo 
       </SigninTitle>
     </Header>

     <Footer>
      <FooterWrapper>
        <SignInSocialButton 
          title='Entrar com Google'
          svg={GoogleSvg}
          onPress={handleSignInWithGoogle}
          />
        <SignInSocialButton 
          title='Entrar com Apple'
          svg={AppleSvg}
          onPress={handleSignInWithApple}
        />
      </FooterWrapper>

      { isLoading && 
        <ActivityIndicator 
        color={theme.colors.shape}
        style={{marginTop:18}}
        />
      }

     </Footer>
    </Container>
  )
}