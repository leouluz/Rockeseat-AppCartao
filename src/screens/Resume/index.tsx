import React, { useState, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HistoryCar } from '../../components/HistoryCar'

import {
  Container, Header, Title, Content, ChartContainer,
  MonthSelect, MonthSelectButton, MonthSelectIcon, Month
} from './styles'
import { categories } from '../../utils/categories';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { addMonths, subMonths, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useTheme } from 'styled-components/native';
import { ActivityIndicator } from 'react-native';

import { useFocusEffect } from '@react-navigation/native'
import { useAuth } from '../../hooks/auth';

interface TransactionData {
  type: 'positive' | 'negative',
  name: string,
  amout: string,
  category: string,
  date: string,
}

interface CategoryData {
  key: string;
  name: string,
  color: string,
  total: number,
  percent: string;
  totalFormatted: string,
}

export function Resume() {

  const [ isLoading, setIsLoading ] = useState(false);
  const [ selectedDate, setSelectedDate ] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])

  const { user } = useAuth();

  const theme = useTheme();

  function handlDateChange(action: 'next' | 'prev'){
    if(action === 'next'){
      setSelectedDate(addMonths(selectedDate, 1));
    }else{
      setSelectedDate(subMonths(selectedDate, 1));
    }
  }

  async function loadData() {
    setIsLoading(true);
    const dataKey = `@gofinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey)
    const responseFormatted = response ? JSON.parse(response) : [];

    // Trazendo apenas registros que são negativos
    const expensives = responseFormatted
      .filter((expensive: TransactionData) => 
        expensive.type === 'negative' &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
      )

    const expensivesTotal = expensives.reduce((acumullator: number, expensive: TransactionData) => {
      return acumullator + Number(expensive.amout);
    }, 0)

    const totalByCategory: CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionData) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amout);
        }
      });

      if (categorySum > 0) {
        const totalFormatted = categorySum
          .toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BLR'
          });

        const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted,
          percent
        })
      }
    })
    setTotalByCategories(totalByCategory);
    setIsLoading(false);
  };

  useFocusEffect(useCallback(() => {
    loadData();
  },[selectedDate]))

  return (
    <Container>
        <Header>
          <Title>Resumo por Categoria</Title>
        </Header>
      {
        isLoading ?
        <ActivityIndicator
          color={theme.colors.primary}
          size="large"
        /> :
        <>
          <Content
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 24,
              paddingBottom: useBottomTabBarHeight(),
            }}
          >
            <MonthSelect>
              <MonthSelectButton onPress={()=> handlDateChange('prev')}>
                <MonthSelectIcon name="chevron-left" />
              </MonthSelectButton>

              <Month>{ format(selectedDate, 'MMMM, yyyy', {locale: ptBR})}</Month>

              <MonthSelectButton onPress={()=> handlDateChange('next')}>
                <MonthSelectIcon name="chevron-right" />
              </MonthSelectButton>
            </MonthSelect>
            <ChartContainer>
              <VictoryPie
                data={totalByCategories}
                colorScale={totalByCategories.map(category => category.color)}
                width={300} height={300}
                style={{
                  labels: {
                    fontSize: RFValue(22),
                    fontWeight: 'bold',
                    fill: theme.colors.shape,
                  },
                }}
                labelRadius={50}
                x="percent"
                y="total"
              />
            </ChartContainer>
            {
              totalByCategories.map(item => (
                <HistoryCar
                  key={item.key}
                  title={item.name}
                  amount={item.totalFormatted}
                  color={item.color}
                />
              ))
            }
          </Content>
        </>
      }
    </Container>
  )
}
