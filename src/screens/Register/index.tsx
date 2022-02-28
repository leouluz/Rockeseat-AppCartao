import React, { useState } from 'react';
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid'

import { Button } from '../../components/Forms/Button';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { Container, Header, Title, Form, Fields, TransactionTypes } from './styles';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { CategorySelect } from '../CategorySelect';
import { InputForm } from '../../components/Forms/InputForm';

import { useNavigation } from '@react-navigation/native';

interface FormData {
  name: string,
  amount: string
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório!'),
  amount: Yup
    .number()
    .typeError('Informe um valor númerico')
    .positive('Digite um valor positivo!')
    .required('O valor é obrigatório!')
});

export function Register() {

  const [transactionType, setTransactionType] = useState('');
  const [categoryModalClose, setCategoryModalClose] = useState(false);

  const [selectCategory, setSelectCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  const navigation = useNavigation<any>();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  function handleTransactionsTypeSelect(type: 'positive' | 'negative') {
    setTransactionType(type)
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalClose(false);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalClose(true);
  }

  async function handleRegister(form: FormData) {
    if (!transactionType)
      return Alert.alert('Escolha um tipo de transação!')

    if (selectCategory.key === 'category')
      return Alert.alert('Escolha uma categoria!')

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amout: form.amount,
      type: transactionType,
      category: selectCategory.key,
      date: new Date()

    }

    try {
      const dataKey = '@gofinances:transactions';

      const data = await AsyncStorage.getItem(dataKey);

      const currentData = data ? JSON.parse(data) : [];

      const dataFormated = [
        ...currentData,
        newTransaction
      ]
      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormated))

      reset();
      setTransactionType('');
      setSelectCategory({
        key: 'category',
        name: 'Categoria'
      });

      navigation.navigate("Listagem");

    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível salvar!");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

            <TransactionTypes>
              <TransactionTypeButton
                type="up"
                title="income"
                isActive={transactionType === 'positive'}
                onPress={() => handleTransactionsTypeSelect('positive')}
              />
              <TransactionTypeButton
                type="down"
                title="outcome"
                isActive={transactionType === 'negative'}
                onPress={() => handleTransactionsTypeSelect('negative')}
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
    </TouchableWithoutFeedback>
  )
}

