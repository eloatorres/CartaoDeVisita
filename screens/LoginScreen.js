import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import api from '../services/api';

export default function LoginScreen({ navigation }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

const handleLogin = async () => {
  console.log('Botão Entrar clicado');
  try {
    const res = await api.post('/login', { name, password });
    console.log('Login bem-sucedido:', res.data); // ⬅️ veja o retorno
    await AsyncStorage.setItem('token', res.data.token);
    navigation.navigate('Card', { id: res.data.id });
  } catch (err) {
    console.log('Erro no login:', err.response?.data || err.message);
    Alert.alert('Erro', 'Credenciais inválidas ou problema no servidor');
  }
};


  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Login</Text>
      <CustomInput placeholder="Nome" value={name} onChangeText={setName} />
      <CustomInput placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword} />
      <CustomButton title="Entrar" onPress={handleLogin} />
      <CustomButton title="Cadastrar" onPress={() => navigation.navigate('Register')} />
    </View>
  );
}
