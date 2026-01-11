import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useCallback, useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { createPost, updatePost } from '../services/posts';

export function PostFormScreen({ route }: any) {
  const { user } = useAuth();
  const navigation = useNavigation<any>();
  const post = route?.params?.post;

  useFocusEffect(
    useCallback(() => {
      if (!user || user.role !== 'teacher') {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      }
    }, [user])
  );

  const [titulo, setTitulo] = useState(post?.titulo || '');
  const [autor, setAutor] = useState(post?.autor || '');
  const [conteudo, setConteudo] = useState(post?.conteudo || '');

  async function handleSubmit() {
    if (!titulo || !autor || !conteudo) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      if (post) {
        await updatePost(post._id, { titulo, autor, conteudo });
      } else {
        await createPost({ titulo, autor, conteudo });
      }

      navigation.goBack();
    } catch {
      Alert.alert('Erro', 'Erro ao salvar o post');
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Header />

      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>
          {post ? 'Editar Post' : 'Novo Post'}
        </Text>

        <TextInput placeholder="Título" value={titulo} onChangeText={setTitulo} style={{ paddingHorizontal: 14, borderWidth: 1, borderColor: '#ddd', borderRadius: 6, marginBottom: 10 }} />
        <TextInput placeholder="Autor" value={autor} onChangeText={setAutor} style={{ paddingHorizontal: 14, borderWidth: 1, borderColor: '#ddd', borderRadius: 6, marginBottom: 10 }} />
        <TextInput placeholder="Conteúdo" value={conteudo} onChangeText={setConteudo} multiline style={{ paddingHorizontal: 16, borderWidth: 1, borderColor: '#ddd', borderRadius: 6, height: 150, marginBottom: 20 }}
        />

        <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: '#1e40af', padding: 14 }}>
          <Text style={{ color: '#fff', textAlign: 'center' }}>Salvar</Text>
        </TouchableOpacity>
      </View>

      <Footer />
    </View>
  );
}
