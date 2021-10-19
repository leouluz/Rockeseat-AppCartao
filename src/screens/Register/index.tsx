import React, { useState } from 'react';
import { Input } from '../../Forms/Input';
import { Button } from '../../Forms/Button';
import { TransactionTypeButton } from '../../Forms/TransactionTypeButton';
import { Container, Header, Title, Form, Fields, TransactionTypes } from './styles';
import { CategorySelect } from '../../Forms/CategorySelect';

export function Register(){

  const [ transactionType, setTransactionType ] = useState('');

  function handleTransactionsTypeSelect(type: 'up' | 'down'){
    setTransactionType(type)
  }
    
  return (
        <Container>
            <Header>
                <Title>
                    Cadastro
                </Title>
            </Header>

            <Form>
              <Fields>
                <Input
                  placeholder="Nome"
                  />
                <Input
                  placeholder="Preço"
                  />

                <TransactionTypes>
                  <TransactionTypeButton
                  type="up"
                  title="income"
                  isActive={ transactionType === 'up'}
                  onPress={() => handleTransactionsTypeSelect('up')}
                  />
                  <TransactionTypeButton
                  type="down"
                  title="outcome"
                  isActive={ transactionType === 'down'}
                  onPress={() => handleTransactionsTypeSelect('down')}
                  />
                </TransactionTypes>

                <CategorySelect title="Categoria"/>

              </Fields>
              <Button title="Enviar" />
            </Form>

        </Container>
    )
}

