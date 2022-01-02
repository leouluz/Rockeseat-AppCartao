import React, { useState, useEffect } from 'react'
import HighlightCard from '../../components/HighlightCard/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  TransactionList,
  LogoutButton
} from './styles';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {

  const [data, setData] = useState<DataListProps[]>([]);

  async function loadTransaction() {

    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    console.log(response)
    const transactions = response ? JSON.parse(response) : [];

    const transactionsFormatted: DataListProps[] = transactions
      .map((item: DataListProps) => {

        const amout = Number(item.amout)
          .toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          });

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }).format(new Date(item.date))

        return {
          id: item.id,
          name: item.name,
          amout,
          type: item.type,
          category: item.category,
          date,
        }
      });
    console.log(transactionsFormatted)
    setData(transactionsFormatted);
  }


  useEffect(() => {
    loadTransaction()
    // async () => {
    //   await AsyncStorage.removeItem('@gofinances:transactions');
    // }
  }, [])
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{ uri: 'https://avatars.githubusercontent.com/u/39962306?v=4' }}
              resizeMode='stretch'
            />
            <User>
              <UserGreeting>Olá</UserGreeting>
              <UserName>Leonardo</UserName>
            </User>
          </UserInfo>
          <LogoutButton onPress={() => { }}>
            <Icon name="power" />
          </LogoutButton>


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
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>

    </Container>
  )
}