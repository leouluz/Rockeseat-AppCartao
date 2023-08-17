import React, { useState } from 'react'
import { Container, Title, Amount } from './styles'
import Checkbox from 'expo-checkbox';

interface Props {
  title: string;
  amount: string;
  color: string;
}

export function HistoryCar({
  title,
  amount,
  color
}: Props) {
  const [ isChecked, setIsChecked ] = useState(true);
  return (
    <Container color={color}>
      <Checkbox
          value={isChecked}
          onValueChange={setIsChecked}
          color={isChecked ? color : undefined}
      />
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  )
}
