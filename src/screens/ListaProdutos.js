import React, { useEffect, useState } from 'react';
import { View, Alert, FlatList } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

export default function ListaProdutos({ navigation }) {
  const [produtos, setProdutos] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    carregarProdutos();
  }, [isFocused]);

  const carregarProdutos = async () => {
    const data = await AsyncStorage.getItem('produtos');
    if (data) setProdutos(JSON.parse(data));
  };

  const excluirProduto = (id) => {
    Alert.alert('Excluir', 'Deseja realmente excluir?', [
      { text: 'Cancelar' },
      {
        text: 'Sim',
        onPress: async () => {
          const novaLista = produtos.filter((item) => item.id !== id);
          await AsyncStorage.setItem('produtos', JSON.stringify(novaLista));
          setProdutos(novaLista);
          Alert.alert('Sucesso', 'Produto excluído com sucesso!');
        },
      },
    ]);
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Button icon="plus" mode="contained" onPress={() => navigation.navigate('ProdutoForm')}>
        Adicionar Produto
      </Button>

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={{ marginVertical: 10 }}>
            <Card.Title title={item.nome} subtitle={`R$ ${item.preco}`} />
            <Card.Content>
              <Text>Categoria: {item.categoria}</Text>
              <Text>Tamanho: {item.tamanho}</Text>
              <Text>Cor: {item.cor}</Text>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => navigation.navigate('ProdutoForm', { produto: item })}>
                Editar
              </Button>
              <Button onPress={() => excluirProduto(item.id)} textColor="red">
                Excluir
              </Button>
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
}
