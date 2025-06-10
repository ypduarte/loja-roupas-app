import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { Card, Text, ActivityIndicator } from 'react-native-paper';
import api from '../services/api';

const categoriasPermitidas = ['Clothes', 'Shoes', 'Accessories'];

export default function CategoriasExternas({ navigation }) {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/categories')
      .then(res => {
        const filtradas = res.data.filter(cat => categoriasPermitidas.includes(cat.name));
        setCategorias(filtradas);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 20 }} />;

  return (
    <FlatList
      data={categorias}
      keyExtractor={item => String(item.id)}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('ProdutosPorCategoria', {
          categoryId: item.id,
          categoryName: item.name
        })}>
          <Card style={{ margin: 8 }}>
            <Card.Content>
              <Text variant="titleMedium">{item.name}</Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      )}
    />
  );
}
