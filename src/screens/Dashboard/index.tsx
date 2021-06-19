import React from 'react';
import HighlightCard from '../../components/HighlightCard/index';
import TransactionCard from '../../components/TransactionCard/index';
import { TransactionCardProps } from '../../components/TransactionCard/index';

import { 
  Container, 
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList
} from './styles';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const data : DataListProps[] = [
    {
      id:'1',
      type: 'positive',
      title:"Desenvolvimento do site",
      amount:"$ 12.000,00",
      category:{
        name:'Vendas',
        icon:'dollar-sign'
      },
      date:"19/06/2021"
    },
    {
      id:'2',
      type: 'negative',
      title:"Hamburgueria Piaza",
      amount:"$ 59,00",
      category:{
        name:'Alimentação',
        icon:'coffee'
      },
      date:"16/06/2021"
    },
    {
      id:'3',
      type: 'negative',
      title:"Aluguel do Apartamento",
      amount:"$ 1200,00",
      category:{
        name:'Casa',
        icon:'shopping-bag'
      },
      date:"10/06/2021"
    }
]
    return (
      <Container>
        <Header>
          <UserWrapper>
            <UserInfo>
              <Photo 
                source={{uri:'https://avatars.githubusercontent.com/u/39962306?v=4'}}
                resizeMode='stretch'
              />
              <User>
                <UserGreeting>Olá</UserGreeting>
                <UserName>Leonardo</UserName>
              </User>
            </UserInfo>
            <Icon name="power"/>
          </UserWrapper>
        </Header>
        <HighlightCards>
          <HighlightCard
            type="up"
            title="Entrada"
            amount="R$ 17.400,00"
            lastTransaction="Ultima transação feita no dia 20 de maio de 2021."
          />
          <HighlightCard
            type="down"
            title="Saidas"
            amount="R$ 1.230,95"
            lastTransaction="Ultima saida 05 de junho de 2021."
          />
          <HighlightCard
            type="total"
            title="Total"
            amount="R$ 16.169,05"
            lastTransaction="60 dias atrás"
          />

        </HighlightCards>
      

      <Transactions>
        <Title>Listagem</Title>
        <TransactionList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => <TransactionCard data={item}/>}
        />
      </Transactions>

      </Container>
    )
}