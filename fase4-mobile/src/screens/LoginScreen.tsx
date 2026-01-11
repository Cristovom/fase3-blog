import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../components/Header';
import { useAuth } from '../contexts/AuthContext';

export function LoginScreen() {
  const navigation = useNavigation<any>();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !senha) {
      Alert.alert('Erro', 'Informe email e senha');
      return;
    }

    try {
      setLoading(true);

      // 🔴 IMPORTANTE: usamos o retorno do signIn
      const loggedUser = await signIn(email, senha);

      if (loggedUser.role === 'teacher') {
        navigation.navigate('AdminPosts');
      } else {
        navigation.navigate('Home');
      }
    } catch (err) {
      Alert.alert('Erro', 'Credenciais inválidas');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Header />

      <View style={{ padding: 24 }}>
        <Text style={{ fontSize: 24, fontWeight: '700', marginBottom: 20 }}>
          Login
        </Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            marginBottom: 12,
            borderRadius: 6,
          }}
        />

        <TextInput
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            marginBottom: 20,
            borderRadius: 6,
          }}
        />

        <Button
          title={loading ? 'Entrando...' : 'Entrar'}
          onPress={handleLogin}
          disabled={loading}
        />
      </View>
    </View>
  );
}
