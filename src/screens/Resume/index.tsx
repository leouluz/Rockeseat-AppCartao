import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HistoryCar } from '../../components/HistoryCar'

import { Container, Header, Title, Content } from './styles'
import { categories } from '../../utils/categories';

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
  total: string,
  color: string,
}

export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])

  useEffect(() => {
    async function loadData() {
      const dataKey = '@gofinances:transactions';
      const response = await AsyncStorage.getItem(dataKey)
      const responseFormatted = response ? JSON.parse(response) : [];

      // Trazendo apenas registros que são negativos
      const expensives = responseFormatted
        .filter((expensive: TransactionData) => {
          expensive.type === 'negative'
        })
      const totalByCategory: CategoryData[] = [];

      categories.forEach(category => {
        let categorySum = 0;

        expensives.forEach((expensive: TransactionData) => {
          if (expensive.category === category.key) {
            categorySum += Number(expensive.amout);
          }
        });

        if (categorySum > 0) {
          const total = categorySum
            .toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BLR'
            });

          totalByCategory.push({
            key: category.key,
            name: category.name,
            color: category.color,
            total
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
        {
          totalByCategories.map(item => (
            <HistoryCar
              key={item.key}
              title={item.name}
              amount={item.total}
              color={item.color}
            />
          ))
        }
      </Content>
    </Container>
  )
}
