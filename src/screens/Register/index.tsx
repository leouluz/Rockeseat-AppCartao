import React, { useState } from 'react';
import { Modal } from 'react-native';
import { useForm } from 'react-hook-form'


import { Input } from '../../components/Forms/Input';
import { Button } from '../../components/Forms/Button';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { Container, Header, Title, Form, Fields, TransactionTypes } from './styles';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { CategorySelect } from '../CategorySelect';
import { InputForm } from '../../components/Forms/InputForm';

interface FormData{
  name: string,
  amount: string
}

export function Register(){

  const [ transactionType, setTransactionType ] = useState('');
  const [ categoryModalClose, setCategoryModalClose ] = useState(false);

  const [ selectCategory, setSelectCategory ] = useState({
    key: 'category',
    name: 'Categoria',
  });

  const {
    control,
    handleSubmit
  } = useForm();

  function handleTransactionsTypeSelect(type: 'up' | 'down'){
    setTransactionType(type)
  }

  function handleCloseSelectCategoryModal(){
    setCategoryModalClose(false);
  }

  function handleOpenSelectCategoryModal(){
    setCategoryModalClose(true);
  }
  
  function handleRegister(form: FormData){
    const data = {
      name: form.name,
      amout: form.amount,
      transactionType,
      category: selectCategory.key
    }
    console.log(data)
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
                <InputForm
                  name="name"
                  control={control}
                  placeholder="Nome"
                  />
                <InputForm
                  name="amount"
                  control={control}
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
              <Button 
                title="Enviar"
                onPress={handleSubmit(handleRegister)} 
              />
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

