import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import ListaProdutos from '../screens/ListaProdutos';
import ProdutoForm from '../screens/ProdutoForm';
import CategoriasExternas from '../screens/CategoriasExternas';
import ProdutosPorCategoria from '../screens/ProdutosPorCategoria';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// ✅ Stack para CRUD de produtos internos
function ProdutosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListaProdutos" component={ListaProdutos} options={{ title: 'Produtos' }} />
      <Stack.Screen name="ProdutoForm" component={ProdutoForm} options={{ title: 'Cadastrar/Editar Produto' }} />
    </Stack.Navigator>
  );
}

// ✅ Stack para navegação entre categorias e produtos externos
function ExternosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Categorias"
        component={CategoriasExternas}
        options={{ title: 'Categorias de Roupas' }}
      />
      <Stack.Screen
        name="ProdutosPorCategoria"
        component={ProdutosPorCategoria}
        options={({ route }) => ({ title: route.params.categoryName })}
      />
    </Stack.Navigator>
  );
}

// ✅ Navegação principal com abas
export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Início" component={HomeScreen} />
        <Tab.Screen name="Produtos" component={ProdutosStack} options={{ headerShown: false }} />
        <Tab.Screen name="Externos" component={ExternosStack} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
