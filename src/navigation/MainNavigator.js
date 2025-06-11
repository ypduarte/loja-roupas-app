import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import ListaProdutos from '../screens/ListaProdutos';
import ProdutoForm from '../screens/ProdutoForm';
import ListaClientes from '../screens/ListaClientes';
import ClienteForm from '../screens/ClienteForm';
import ListaFornecedores from '../screens/ListaFornecedores';
import FornecedorForm from '../screens/FornecedorForm';
import CategoriasExternas from '../screens/CategoriasExternas';
import ProdutosPorCategoria from '../screens/ProdutosPorCategoria';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ProdutosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListaProdutos" component={ListaProdutos} options={{ title: 'Produtos' }} />
      <Stack.Screen name="ProdutoForm" component={ProdutoForm} options={{ title: 'Cadastrar/Editar Produto' }} />
    </Stack.Navigator>
  );
}

function ClientesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListaClientes" component={ListaClientes} options={{ title: 'Clientes' }} />
      <Stack.Screen name="ClienteForm" component={ClienteForm} options={{ title: 'Cadastrar/Editar Cliente' }} />
    </Stack.Navigator>
  );
}

function FornecedoresStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListaFornecedores" component={ListaFornecedores} options={{ title: 'Fornecedores' }} />
      <Stack.Screen name="FornecedorForm" component={FornecedorForm} options={{ title: 'Cadastrar/Editar Fornecedor' }} />
    </Stack.Navigator>
  );
}

function ExternosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Categorias" component={CategoriasExternas} />
      <Stack.Screen name="ProdutosPorCategoria" component={ProdutosPorCategoria} />
    </Stack.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Início" component={HomeScreen} />
        <Tab.Screen name="Produtos" component={ProdutosStack} options={{ headerShown: false }} />
        <Tab.Screen name="Clientes" component={ClientesStack} options={{ headerShown: false }} />
        <Tab.Screen name="Fornecedores" component={FornecedoresStack} options={{ headerShown: false }} />
        <Tab.Screen name="Externos" component={ExternosStack} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
