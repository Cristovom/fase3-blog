import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useCallback, useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { createUser, updateUser } from '../services/users';

export function UserFormScreen({ route }: any) {
  const navigation = useNavigation<any>();
  const user = route?.params?.user;
  const role = route?.params?.role;

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  async function handleSubmit() {
    try {
      if (user) {
        await updateUser(user._id, { name, email, role });
      } else {
        await createUser({ name, email, role });
      }
      navigation.goBack();
    } catch {
      Alert.alert('Erro', 'Erro ao salvar usuário');
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Header />

      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>
          {user ? 'Editar Usuário' : 'Novo Usuário'}
        </Text>

        <TextInput placeholder="Nome" value={name} onChangeText={setName} style={{ paddingHorizontal: 14, borderWidth: 1, borderColor: '#ddd', borderRadius: 6, marginBottom: 10 }} />
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" style={{ paddingHorizontal: 14, borderWidth: 1, borderColor: '#ddd', borderRadius: 6, marginBottom: 20 }} />

        <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: '#1e40af', padding: 14 }}>
          <Text style={{ color: '#fff', textAlign: 'center' }}>Salvar</Text>
        </TouchableOpacity>
      </View>

      <Footer />
    </View>
  );
}
