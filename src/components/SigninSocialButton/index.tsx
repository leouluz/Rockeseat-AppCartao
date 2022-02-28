import { RectButtonProps } from 'react-native-gesture-handler'
import { SvgProps } from 'react-native-svg';
import React from 'react'

import {
  Button,
  ImageContainer,
  Text,
} from './styles'

interface Props extends RectButtonProps {
  title: string;
  svg: React.FC<SvgProps>;
}

export function SignInSocialButton({
  title,
  svg: Svg,
  ...rest
}: Props) {
  return (
    <Button>
      <ImageContainer>
        <Svg />
      </ImageContainer>
      <Text>
        {title}
      </Text>
    </Button>
  )
}