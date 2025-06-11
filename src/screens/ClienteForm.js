import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaskInput, { Masks } from 'react-native-mask-input';

export default function ClienteForm({ route, navigation }) {
  const [cliente, setCliente] = useState({
    nome: '',
    telefone: '',
    email: '',
    cpf: '',
    endereco: '',
  });

  const [erros, setErros] = useState({});

  useEffect(() => {
    if (route.params?.cliente) {
      setCliente(route.params.cliente);
    }
  }, [route.params]);

  const validar = () => {
    const newErros = {};
    if (!cliente.nome) newErros.nome = 'Nome é obrigatório';
    if (!cliente.telefone) newErros.telefone = 'Telefone é obrigatório';
    if (!cliente.email) newErros.email = 'Email é obrigatório';
    if (!cliente.cpf) newErros.cpf = 'CPF é obrigatório';
    if (!cliente.endereco) newErros.endereco = 'Endereço é obrigatório';
    setErros(newErros);
    return Object.keys(newErros).length === 0;
  };

  const salvar = async () => {
    if (!validar()) return;

    const data = await AsyncStorage.getItem('clientes');
    const clientes = data ? JSON.parse(data) : [];

    const novoCliente = { ...cliente };

    if (cliente.id) {
      const index = clientes.findIndex(c => c.id === cliente.id);
      clientes[index] = novoCliente;
    } else {
      novoCliente.id = Date.now();
      clientes.push(novoCliente);
    }

    await AsyncStorage.setItem('clientes', JSON.stringify(clientes));
    navigation.goBack();
  };

  return (
    <ScrollView style={{ padding: 10 }}>
      <TextInput
        label="Nome"
        value={cliente.nome}
        onChangeText={text => setCliente({ ...cliente, nome: text })}
      />
      <HelperText type="error" visible={!!erros.nome}>{erros.nome}</HelperText>

      <MaskInput
        value={cliente.telefone}
        onChangeText={(masked) => setCliente({ ...cliente, telefone: masked })}
        mask={Masks.BRL_PHONE}
        placeholder="(99) 99999-9999"
        keyboardType="numeric"
        style={{ marginTop: 10, marginBottom: 5, backgroundColor: 'white', padding: 10, borderRadius: 5 }}
      />
      <HelperText type="error" visible={!!erros.telefone}>{erros.telefone}</HelperText>

      <TextInput
        label="Email"
        value={cliente.email}
        onChangeText={text => setCliente({ ...cliente, email: text })}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <HelperText type="error" visible={!!erros.email}>{erros.email}</HelperText>

      <MaskInput
        value={cliente.cpf}
        onChangeText={(masked) => setCliente({ ...cliente, cpf: masked })}
        mask={Masks.BRL_CPF}
        placeholder="000.000.000-00"
        keyboardType="numeric"
        style={{ marginTop: 10, marginBottom: 5, backgroundColor: 'white', padding: 10, borderRadius: 5 }}
      />
      <HelperText type="error" visible={!!erros.cpf}>{erros.cpf}</HelperText>

      <TextInput
        label="Endereço"
        value={cliente.endereco}
        onChangeText={text => setCliente({ ...cliente, endereco: text })}
      />
      <HelperText type="error" visible={!!erros.endereco}>{erros.endereco}</HelperText>

      <Button mode="contained" onPress={salvar} style={{ marginTop: 20 }}>
        Salvar
      </Button>
    </ScrollView>
  );
}
