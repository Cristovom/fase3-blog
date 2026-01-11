import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
// import { getPosts } from '../services/posts';
import { getPosts, Post } from '../services/posts';

export function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();

  const [page, setPage] = useState(1);
  const limit = 2;

  async function loadPosts() {
    setLoading(true);
    const data = await getPosts(search);
    setPosts(data);
    setLoading(false);
  }

  async function load(searchValue?: string) {
    const data = await getPosts(searchValue);
    setPosts(data);
  }

  useEffect(() => {
    loadPosts();
  }, []);

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

        {loading && <Text>Carregando...</Text>}

        <FlatList
          data={posts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Post', { id: item._id })}
              style={{
                borderWidth: 1,
                borderColor: '#ddd',
                padding: 12,
                borderRadius: 6,
                marginBottom: 10,
              }}
            >
              {/* <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                {item.titulo}
              </Text>
              <Text style={{ color: '#555' }}>
                Autor: {item.autor}
              </Text>
              <Text numberOfLines={2} style={{ marginTop: 6 }}>
                {item.conteudo}
              </Text> */}

              <View style={{ marginBottom: 8 }}>
                <Text style={{ color: '#294381', fontSize: 12, fontWeight: '600' }}>
                  Novidade • 5 min
                </Text>
              </View>

              <Text style={{ fontSize: 18, fontWeight: '700', color: '#212225' }}>
                {item.titulo}
              </Text>

              <Text
                style={{
                  marginTop: 6,
                  color: '#212225',
                  fontSize: 14,
                  lineHeight: 20,
                }}
                numberOfLines={2}
              >
                {item.conteudo}
              </Text>

              <View
                style={{
                  marginTop: 16,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={{ color: '#294381', fontSize: 12 }}>
                  👤 {item.autor}
                </Text>
                <Text style={{ color: '#294381', fontSize: 12 }}>
                  📅 09/01/2026
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      <Footer />
    </View>
  );
}
