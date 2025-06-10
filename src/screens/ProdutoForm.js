import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaskInput, { Masks } from 'react-native-mask-input';

export default function ProdutoForm({ route, navigation }) {
  const produtoEdit = route.params?.produto;

  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [cor, setCor] = useState('');
  const [erros, setErros] = useState({});

  useEffect(() => {
    if (produtoEdit) {
      setNome(produtoEdit.nome);
      setPreco(produtoEdit.preco);
      setCategoria(produtoEdit.categoria);
      setTamanho(produtoEdit.tamanho);
      setCor(produtoEdit.cor);
    }
  }, [produtoEdit]);

  const validar = () => {
    const newErros = {};
    if (!nome) newErros.nome = 'Nome é obrigatório';
    if (!preco) newErros.preco = 'Preço é obrigatório';
    if (!categoria) newErros.categoria = 'Categoria é obrigatória';
    if (!tamanho) newErros.tamanho = 'Tamanho é obrigatório';
    if (!cor) newErros.cor = 'Cor é obrigatória';
    setErros(newErros);
    return Object.keys(newErros).length === 0;
  };

  const salvar = async () => {
    if (!validar()) return;

    const novoProduto = {
      id: produtoEdit?.id || Date.now(),
      nome,
      preco,
      categoria,
      tamanho,
      cor,
    };

    const data = await AsyncStorage.getItem('produtos');
    const lista = data ? JSON.parse(data) : [];

    if (produtoEdit) {
      const index = lista.findIndex((p) => p.id === produtoEdit.id);
      lista[index] = novoProduto;
    } else {
      lista.push(novoProduto);
    }

    await AsyncStorage.setItem('produtos', JSON.stringify(lista));
    navigation.goBack();
  };

  return (
    <ScrollView style={{ padding: 10 }}>
      <TextInput label="Nome" value={nome} onChangeText={setNome} />
      <HelperText type="error" visible={!!erros.nome}>{erros.nome}</HelperText>

      <MaskInput
        value={preco}
        onChangeText={(masked) => setPreco(masked)}
        mask={Masks.BRL_CURRENCY}
        style={{ marginVertical: 10 }}
        placeholder="R$ 0,00"
      />
      <HelperText type="error" visible={!!erros.preco}>{erros.preco}</HelperText>

      <TextInput label="Categoria" value={categoria} onChangeText={setCategoria} />
      <HelperText type="error" visible={!!erros.categoria}>{erros.categoria}</HelperText>

      <TextInput label="Tamanho" value={tamanho} onChangeText={setTamanho} />
      <HelperText type="error" visible={!!erros.tamanho}>{erros.tamanho}</HelperText>

      <TextInput label="Cor" value={cor} onChangeText={setCor} />
      <HelperText type="error" visible={!!erros.cor}>{erros.cor}</HelperText>

      <Button mode="contained" onPress={salvar} style={{ marginTop: 20 }}>
        Salvar
      </Button>
    </ScrollView>
  );
}
