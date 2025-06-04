import React, { useState } from 'react';
import { View, Text, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import api from '../services/api';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]); // imagem foi selecionada
    }
  };

  const handleRegister = async () => {
     console.log('Botão Cadastrar clicado');
    if (!name || !password || !image) {
      Alert.alert('Erro', 'Preencha todos os campos e selecione uma imagem');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('password', password);
    formData.append('image', {
      uri: image.uri,
      type: 'image/jpeg',
      name: 'foto.jpg',
    });

    try {
      await api.post('/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate('Login'); // redireciona automaticamente
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível realizar o cadastro.');
      console.log(err);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Cadastro</Text>

      <CustomInput placeholder="Nome" value={name} onChangeText={setName} />
      <CustomInput placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword} />

      <CustomButton title="Escolher Imagem" onPress={pickImage} />

      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{ width: 150, height: 150, marginVertical: 10, borderRadius: 10 }}
        />
      )}

      <CustomButton title="Cadastrar" onPress={handleRegister} />
    </View>
  );
}
