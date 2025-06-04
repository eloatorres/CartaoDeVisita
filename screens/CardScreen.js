import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

export default function CardScreen({ route }) {
  const { id } = route.params;
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchCard = async () => {
      const token = await AsyncStorage.getItem('token');
      const res = await api.get(`/card/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('URL da imagem recebida:', res.data.image);
      setData(res.data);
    };
    fetchCard();
  }, []);

  if (!data) return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cartão de Visita</Text>
      <View style={styles.card}>
        <Image
            source={{ uri: data.image }}
            style={{
                width: 140,
                height: 140,
                borderRadius: 70,
                marginBottom: 20,
                backgroundColor: '#ccc',
            }}
            onError={(e) => console.log('Erro ao carregar imagem', e.nativeEvent.error)}
            />
        <Text style={styles.name}>{data.name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 20,
    backgroundColor: '#ccc',
  },
  name: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
});
