import React, { useState } from 'react';
import { Modal } from 'react-native';
import { Input } from '../../components/Forms/Input';
import { Button } from '../../components/Forms/Button';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { Container, Header, Title, Form, Fields, TransactionTypes } from './styles';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { CategorySelect } from '../CategorySelect';

export function Register(){

  const [ transactionType, setTransactionType ] = useState('');
  const [ categoryModalClose, setCategoryModalClose ] = useState(false);

  const [ selectCategory, setSelectCategory ] = useState({
    key: 'category',
    name: 'Categoria',
  });

  function handleTransactionsTypeSelect(type: 'up' | 'down'){
    setTransactionType(type)
  }

  function handleCloseSelectCategoryModal(){
    setCategoryModalClose(false);
  }

  function handleOpenSelectCategoryModal(){
    setCategoryModalClose(true);
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

                <CategorySelectButton 
                  title={selectCategory.name}
                  onPress={handleOpenSelectCategoryModal}
                />

              </Fields>
              <Button title="Enviar" />
            </Form>

            <Modal visible={categoryModalClose}>
              <CategorySelect 
              category={selectCategory}
              setCategory={setSelectCategory}
              closeSelectCategory={handleCloseSelectCategoryModal}
              />
            </Modal>

        </Container>
    )
}

