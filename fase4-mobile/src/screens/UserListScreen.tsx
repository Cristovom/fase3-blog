import { paginate } from '../utils/paginate';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { useCallback, useState, useMemo } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { getUsers, deleteUser, User } from '../services/users';

export function UserListScreen({ route }: any) {
  const { role } = route.params;
  const navigation = useNavigation<any>();

  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');

  const [page, setPage] = useState(1);
  const limit = 2;

  // 🔍 FILTRO LOCAL
  const filteredUsers = useMemo(() => {
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const paginatedUsers = paginate(filteredUsers, page, limit);

  async function load() {
    const data = await getUsers(role);
    setUsers(data);
  }

  async function handleDelete(id: string) {
    Alert.alert('Confirmar', 'Excluir usuário?', [
      { text: 'Cancelar' },
      {
        text: 'Excluir',
        onPress: async () => {
          await deleteUser(id);
          setUsers((prev) => prev.filter((u) => u._id !== id));
        },
      },
    ]);
  }

  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  function handleSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  return (
    <View style={{ flex: 1 }}>
      <Header />

      <View style={{ flex: 1, padding: 16 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('UserForm', { role })}
          style={{
            backgroundColor: '#1e40af',
            padding: 12,
            borderRadius: 6,
            marginBottom: 20,
          }}
        >
          <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>
            Novo {role === 'teacher' ? 'Professor' : 'Aluno'}
          </Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 22, marginBottom: 12 }}>
          Lista de {role === 'teacher' ? 'Professores' : 'Alunos'}
        </Text>

        {/* 🔍 SEARCH */}
        <TextInput
          placeholder={`Buscar ${role === 'teacher' ? 'professor' : 'aluno'}...`}
          value={search}
          onChangeText={handleSearch}
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            borderRadius: 6,
            marginBottom: 16,
          }}
        />

        <FlatList
          data={paginatedUsers}
          keyExtractor={(u) => u._id}
          renderItem={({ item }) => (
            <View
              style={{
                borderWidth: 1,
                borderColor: '#ddd',
                borderRadius: 6,
                padding: 12,
                marginBottom: 10,
              }}
            >
              <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
              <Text>{item.email}</Text>

              <View style={{ flexDirection: 'row', marginTop: 8 }}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('UserForm', { user: item, role })
                  }
                >
                  <Text style={{ color: 'green', marginRight: 16 }}>
                    Editar
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleDelete(item._id)}>
                  <Text style={{ color: 'red' }}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        {/* PAGINAÇÃO */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 16,
          }}
        >
          <TouchableOpacity
            disabled={page === 1}
            onPress={() => setPage((p) => p - 1)}
          >
            <Text style={{ color: page === 1 ? '#aaa' : '#1e40af' }}>
              Anterior
            </Text>
          </TouchableOpacity>

          <Text>Página {page}</Text>

          <TouchableOpacity
            disabled={page * limit >= filteredUsers.length}
            onPress={() => setPage((p) => p + 1)}
          >
            <Text
              style={{
                color:
                  page * limit >= filteredUsers.length ? '#aaa' : '#1e40af',
              }}
            >
              Próxima
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Footer />
    </View>
  );
}
