import React from 'react'
import { HistoryCar } from '../../components/HistoryCar'

import { Container, Header, Title } from './styles'

export function Resume() {
  return (
    <Container>
      <Header>
        <Title>Resumo por Categoria</Title>
      </Header>

      <HistoryCar
        title='Compras'
        amount='R$ 150,00'
        color='red'

      />
    </Container>
  )
}
