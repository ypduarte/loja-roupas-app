import React, { useEffect, useState } from 'react';
import { View, Alert, FlatList } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

export default function ListaFornecedores({ navigation }) {
  const [fornecedores, setFornecedores] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    carregarFornecedores();
  }, [isFocused]);

  const carregarFornecedores = async () => {
    const data = await AsyncStorage.getItem('fornecedores');
    if (data) setFornecedores(JSON.parse(data));
  };

  const excluirFornecedor = (id) => {
    Alert.alert('Excluir', 'Deseja realmente excluir?', [
      { text: 'Cancelar' },
      {
        text: 'Sim',
        onPress: async () => {
          const novaLista = fornecedores.filter((item) => item.id !== id);
          await AsyncStorage.setItem('fornecedores', JSON.stringify(novaLista));
          setFornecedores(novaLista);
          Alert.alert('Sucesso', 'Fornecedor excluído com sucesso!');
        },
      },
    ]);
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Button icon="plus" mode="contained" onPress={() => navigation.navigate('FornecedorForm')}>
        Adicionar Fornecedor
      </Button>

      <FlatList
        data={fornecedores}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={{ marginVertical: 10 }}>
            <Card.Title title={item.nome} subtitle={item.email} />
            <Card.Content>
              <Text>CNPJ: {item.cnpj}</Text>
              <Text>Telefone: {item.telefone}</Text>
              <Text>Endereço: {item.endereco}</Text>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => navigation.navigate('FornecedorForm', { fornecedor: item })}>
                Editar
              </Button>
              <Button onPress={() => excluirFornecedor(item.id)} textColor="red">
                Excluir
              </Button>
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
}
