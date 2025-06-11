import React, { useEffect, useState } from 'react';
import { View, Alert, FlatList } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

export default function ListaClientes({ navigation }) {
  const [clientes, setClientes] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    carregarClientes();
  }, [isFocused]);

  const carregarClientes = async () => {
    const data = await AsyncStorage.getItem('clientes');
    if (data) setClientes(JSON.parse(data));
  };

  const excluirCliente = (id) => {
    Alert.alert('Excluir', 'Deseja realmente excluir?', [
      { text: 'Cancelar' },
      {
        text: 'Sim',
        onPress: async () => {
          const novaLista = clientes.filter((item) => item.id !== id);
          await AsyncStorage.setItem('clientes', JSON.stringify(novaLista));
          setClientes(novaLista);
          Alert.alert('Sucesso', 'Cliente excluído com sucesso!');
        },
      },
    ]);
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Button icon="plus" mode="contained" onPress={() => navigation.navigate('ClienteForm')}>
        Adicionar Cliente
      </Button>

      <FlatList
        data={clientes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={{ marginVertical: 10 }}>
            <Card.Title title={item.nome} subtitle={item.email} />
            <Card.Content>
              <Text>Telefone: {item.telefone}</Text>
              <Text>CPF: {item.cpf}</Text>
              <Text>Endereço: {item.endereco}</Text>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => navigation.navigate('ClienteForm', { cliente: item })}>
                Editar
              </Button>
              <Button onPress={() => excluirCliente(item.id)} textColor="red">
                Excluir
              </Button>
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
}
