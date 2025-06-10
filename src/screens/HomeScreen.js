import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text variant="headlineMedium">Bem-vindo à Loja!</Text>
      <Button mode="contained" onPress={() => navigation.navigate('Produtos')}>Ver Produtos</Button>
    </View>
  );
}
