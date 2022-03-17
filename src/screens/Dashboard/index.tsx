import React, { useState, useEffect, useCallback } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFocusEffect } from '@react-navigation/native'
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';

import { ActivityIndicator } from 'react-native'

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
  TransactionList,
  LogoutButton,
  LoadContainer
} from './styles';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amout: string;
  lastTransaction: string;
}

interface HighlightDate {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {

  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightDate>({} as HighlightDate);

  const theme = useTheme();

  const { signOut, user } = useAuth();

  function getLastTransactionDate(
    collection: DataListProps[],
    type: 'positive' | 'negative'
  ) {

    const collectionFiltered = collection.filter((transaction) => transaction.type === type);

    if(collectionFiltered.length === 0)
    return 0;

    // Função que recupera as informações das transactions
    // E verifica qual foi a ultima transação feita
    const lastTransaction = new Date(
      Math.max.apply(Math, collectionFiltered
        .map((transaction) => new Date(transaction.date).getTime())))

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}`;
  }

  async function loadTransaction() {

    const dataKey = `@gofinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions
      .map((item: DataListProps) => {

        if (item.type === 'positive') {
          entriesTotal += Number(item.amout);
        } else {
          expensiveTotal += Number(item.amout);
        }

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
    setTransactions(transactionsFormatted.reverse());

    const lastTransactionExpensive = getLastTransactionDate(transactions, 'negative');
    const lastTransactionEntries = getLastTransactionDate(transactions, 'positive');
    const lastTransactiontotal = lastTransactionExpensive;

    const total = entriesTotal - expensiveTotal;

    setHighlightData({
      entries: {
        amout: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactionEntries === 0 
        ? 'Não há transações'
        : `Última entrada dia ${lastTransactionEntries}`
      },
      expensives: {
        amout: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactionExpensive === 0 
        ? 'Não há transações'
        : `Última Saida ${lastTransactionExpensive}`
      },
      total: {
        amout: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactiontotal === 0 
        ? 'Não há movimentações'
        : `Última atualização ${lastTransactiontotal}`
      },
    });
    setIsLoading(false)
  }


  useEffect(() => {
    loadTransaction();
  }, [])

  useFocusEffect(useCallback(() => {
    loadTransaction();
  }, []))

  return (
    <Container>
      {
        isLoading ?
          <LoadContainer>
            <ActivityIndicator
              color={theme.colors.primary}
              size="large"
            />
          </LoadContainer>
          :
          <>
            <Header>
              <UserWrapper>
                <UserInfo>
                  <Photo
                    source={{ uri: user.photo }}
                    resizeMode='stretch'
                  />
                  <User>
                    <UserGreeting>Olá</UserGreeting>
                    <UserName>{user.name}</UserName>
                  </User>
                </UserInfo>
                <LogoutButton onPress={signOut}>
                  <Icon name="power" />
                </LogoutButton>


              </UserWrapper>
            </Header>
            <HighlightCards>
              <HighlightCard
                type="up"
                title="Entrada"
                amount={highlightData.entries.amout}
                lastTransaction={highlightData.entries.lastTransaction}
              />
              <HighlightCard
                type="down"
                title="Saidas"
                amount={highlightData.expensives.amout}
                lastTransaction={highlightData.expensives.lastTransaction}
              />
              <HighlightCard
                type="total"
                title="Total"
                amount={highlightData.total.amout}
                lastTransaction={highlightData.expensives.lastTransaction}

              />

            </HighlightCards>


            <Transactions>
              <Title>Listagem</Title>
              <TransactionList
                data={transactions}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <TransactionCard data={item} />}
              />
            </Transactions>
          </>
      }
    </Container>
  )
}