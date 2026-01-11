import { paginate } from '../utils/paginate';
import { View, Text, FlatList, TouchableOpacity, Alert, TextInput } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useCallback, useState } from 'react';
import { deletePost, getPosts, Post } from '../services/posts';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function AdminPostsScreen() {
  const { user } = useAuth();
  const navigation = useNavigation<any>();

  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState('');

  const [page, setPage] = useState(1);
  const limit = 2;

  const paginatedPosts = paginate(posts, page, limit);

  // 🔐 Proteção de rota
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

  async function load(searchValue?: string) {
    const data = await getPosts(searchValue);
    setPosts(data);
  }

  async function handleDelete(id: string) {
    Alert.alert('Confirmar', 'Excluir este post?', [
      { text: 'Cancelar' },
      {
        text: 'Excluir',
        onPress: async () => {
          await deletePost(id);
          setPosts(prev => prev.filter(p => p._id !== id));
        },
      },
    ]);
  }

  // 🔄 Recarrega ao entrar na tela
  useFocusEffect(
    useCallback(() => {
      load(search);
    }, [])
  );

  // 🔍 Search em tempo real
  function handleSearch(value: string) {
    setSearch(value);
    setPage(1);
    load(value);
  }

  return (
    <View style={{ flex: 1 }}>
      <Header />

      <View style={{ flex: 1, padding: 16 }}>
        {/* Botões de navegação */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Teachers')}
            style={{ width: '31%', backgroundColor: '#1e40af', padding: 12, borderRadius: 6 }}
          >
            <Text style={{ color: '#fff', textAlign: 'center' }}>Professores</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Students')}
            style={{ width: '31%', borderWidth: 1, borderColor: '#ddd', borderRadius: 6, padding: 12 }}
          >
            <Text style={{ color: '#1e40af', textAlign: 'center' }}>Alunos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('PostForm')}
            style={{ width: '31%', backgroundColor: '#90af1e', padding: 12, borderRadius: 6 }}
          >
            <Text style={{ color: '#fff', textAlign: 'center' }}>Novo Post</Text>
          </TouchableOpacity>
        </View>

        <Text style={{ color: '#212225', fontSize: 28, paddingTop: 30 }}>
          Lista das matérias publicadas
        </Text>

        {/* 🔍 SEARCH */}
        <TextInput
          placeholder="Buscar matéria..."
          value={search}
          onChangeText={handleSearch}
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            borderRadius: 6,
            marginTop: 16,
            marginBottom: 16,
          }}
        />

        {/* LISTA PAGINADA */}
        <FlatList
          data={paginatedPosts}
          keyExtractor={i => i._id}
          renderItem={({ item }) => (
            <View style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 6, padding: 12, marginBottom: 10 }}>
              <Text style={{ fontWeight: 'bold' }}>{item.titulo}</Text>
              <Text>{item.autor}</Text>

              <View style={{ flexDirection: 'row', marginTop: 8 }}>
                <TouchableOpacity onPress={() => navigation.navigate('PostForm', { post: item })}>
                  <Text style={{ color: 'green', marginRight: 16 }}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleDelete(item._id)}>
                  <Text style={{ color: 'red' }}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        {/* PAGINAÇÃO */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
          <TouchableOpacity disabled={page === 1} onPress={() => setPage(p => p - 1)}>
            <Text style={{ color: page === 1 ? '#aaa' : '#1e40af' }}>Anterior</Text>
          </TouchableOpacity>

          <Text>Página {page}</Text>

          <TouchableOpacity
            disabled={page * limit >= posts.length}
            onPress={() => setPage(p => p + 1)}
          >
            <Text style={{ color: page * limit >= posts.length ? '#aaa' : '#1e40af' }}>
              Próxima
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Footer />
    </View>
  );
}
