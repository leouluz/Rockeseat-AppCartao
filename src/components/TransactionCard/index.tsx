import React from 'react'
import { categories } from '../../utils/categories';
import {
  Container,
  Title,
  Amount,
  Footer,
  Icon,
  Category,
  CategoryName,
  Date,
} from './styles';


export interface TransactionCardProps {
  type: 'positive' | 'negative',
  name: string,
  amout: string,
  category: string,
  date: string,
}
interface Props {
  data: TransactionCardProps
}

export default function TransactionCard({ data }: Props) {
  const [category] = categories.filter(
    item => item.key === data.category
  );
  return (
    <Container>
      <Title>{data.name}</Title>
      <Amount type={data.type}>
        {data.type === 'negative' && '- '}
        {data.amout}
      </Amount>
      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  )
}
