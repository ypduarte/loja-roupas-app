import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Card, Text, ActivityIndicator } from 'react-native-paper';
import api from '../services/api';

export default function ProdutosPorCategoria({ route }) {
  const { categoryId } = route.params;
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/categories/${categoryId}/products`)
      .then(res => setProdutos(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [categoryId]);

  if (loading) return <ActivityIndicator style={{ marginTop: 20 }} />;

  return (
    <FlatList
      data={produtos}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <Card style={{ margin: 8 }}>
          {item.images && item.images.length > 0 && (
            <Card.Cover source={{ uri: item.images[0] }} />
          )}
          <Card.Title title={item.title} subtitle={`R$ ${item.price.toFixed(2)}`} />
          <Card.Content>
            <Text numberOfLines={2}>{item.description}</Text>
          </Card.Content>
        </Card>
      )}
    />
  );
}
