import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function Home({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text variant="titleLarge" style={{ textAlign: 'center', marginBottom: 20 }}>
        Bem-vindo à Loja de Roupas
      </Text>

      <Button
  mode="contained"
  onPress={() => navigation.navigate('Produtos')} // só o nome da aba
  style={{ marginBottom: 10 }}
>
  Ver Produtos
</Button>

<Button
  mode="contained"
  onPress={() => navigation.navigate('Clientes')}
  style={{ marginBottom: 10 }}
>
  Ver Clientes
</Button>

<Button
  mode="contained"
  onPress={() => navigation.navigate('Fornecedores')}
>
  Ver Fornecedores
</Button>
    </View>
  );
}
