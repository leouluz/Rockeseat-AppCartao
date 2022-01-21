import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HistoryCar } from '../../components/HistoryCar'

import { Container, Header, Title, Content, ChartContainer } from './styles'
import { categories } from '../../utils/categories';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { useTheme } from 'styled-components/native';

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
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])

  const theme = useTheme();

  useEffect(() => {
    async function loadData() {
      const dataKey = '@gofinances:transactions';
      const response = await AsyncStorage.getItem(dataKey)
      const responseFormatted = response ? JSON.parse(response) : [];

      // Trazendo apenas registros que são negativos
      const expensives = responseFormatted
        .filter((expensive: TransactionData) => expensive.type === 'negative')

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
    };

    loadData();
  }, [])



  return (
    <Container>
      <Header>
        <Title>Resumo por Categoria</Title>
      </Header>
      <Content>
        <ChartContainer>
          <VictoryPie
            data={totalByCategories}
            colorScale={totalByCategories.map(category => category.color)}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: 'bold',
                fill: theme.colors.shape
              }
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
    </Container>
  )
}
