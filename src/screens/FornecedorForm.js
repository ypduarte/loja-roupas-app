import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import MaskInput, { Masks } from 'react-native-mask-input';

export default function FornecedorForm() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [erros, setErros] = useState({});

  const navigation = useNavigation();
  const route = useRoute();
  const fornecedor = route.params?.fornecedor;

  useEffect(() => {
    if (fornecedor) {
      setNome(fornecedor.nome);
      setTelefone(fornecedor.telefone);
      setEmail(fornecedor.email);
      setEmpresa(fornecedor.empresa);
      setCnpj(fornecedor.cnpj);
    }
  }, [fornecedor]);

  const validar = () => {
    const newErros = {};
    if (!nome) newErros.nome = 'Nome é obrigatório';
    if (!telefone) newErros.telefone = 'Telefone é obrigatório';
    if (!email) newErros.email = 'Email é obrigatório';
    if (!empresa) newErros.empresa = 'Empresa é obrigatória';
    if (!cnpj) newErros.cnpj = 'CNPJ é obrigatório';
    setErros(newErros);
    return Object.keys(newErros).length === 0;
  };

  const salvar = async () => {
    if (!validar()) return;

    const novoFornecedor = {
      id: fornecedor?.id || Date.now(),
      nome,
      telefone,
      email,
      empresa,
      cnpj,
    };

    const data = await AsyncStorage.getItem('fornecedores');
    const fornecedores = data ? JSON.parse(data) : [];

    if (fornecedor) {
      const index = fornecedores.findIndex((item) => item.id === fornecedor.id);
      fornecedores[index] = novoFornecedor;
    } else {
      fornecedores.push(novoFornecedor);
    }

    await AsyncStorage.setItem('fornecedores', JSON.stringify(fornecedores));
    navigation.goBack();
  };

  return (
    <ScrollView style={{ padding: 10 }}>
      <TextInput label="Nome" value={nome} onChangeText={setNome} />
      <HelperText type="error" visible={!!erros.nome}>{erros.nome}</HelperText>

      <MaskInput
        value={telefone}
        onChangeText={(masked) => setTelefone(masked)}
        mask={Masks.BRL_PHONE}
        keyboardType="numeric"
        placeholder="(99) 99999-9999"
        style={{ marginTop: 10, marginBottom: 5, backgroundColor: 'white', padding: 10, borderRadius: 5 }}
      />
      <HelperText type="error" visible={!!erros.telefone}>{erros.telefone}</HelperText>

      <TextInput label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <HelperText type="error" visible={!!erros.email}>{erros.email}</HelperText>

      <TextInput label="Empresa" value={empresa} onChangeText={setEmpresa} />
      <HelperText type="error" visible={!!erros.empresa}>{erros.empresa}</HelperText>

      <MaskInput
        value={cnpj}
        onChangeText={(masked) => setCnpj(masked)}
        mask={Masks.BRL_CNPJ}
        keyboardType="numeric"
        placeholder="00.000.000/0000-00"
        style={{ marginTop: 10, marginBottom: 5, backgroundColor: 'white', padding: 10, borderRadius: 5 }}
      />
      <HelperText type="error" visible={!!erros.cnpj}>{erros.cnpj}</HelperText>

      <Button mode="contained" onPress={salvar} style={{ marginTop: 20 }}>
        Salvar
      </Button>
    </ScrollView>
  );
}
