import React, { useContext } from 'react'
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

export function Signin() {
  const data = useAuth();
  console.log(data)

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
        />
        <SignInSocialButton 
          title='Entrar com Apple'
          svg={AppleSvg}
        />
      </FooterWrapper>
     </Footer>
    </Container>
  )
}