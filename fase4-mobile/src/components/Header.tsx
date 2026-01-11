import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';

export function Header() {
  const navigation = useNavigation<any>();
  const { user, signOut } = useAuth();

  return (
    <View
      style={{
        height: 64,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#0f172a' }}>
          Blog
        </Text>
      </TouchableOpacity>

      {user ? (
        <View style={{ display: 'flex', flexWrap: 'wrap', marginTop: 20 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('AdminPosts')}
            style={{
              // backgroundColor: '#294381',
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 0,
              marginRight: 10,
            }}
          >
            <Text style={{ color: '#000', fontWeight: '600' }}>Painel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              signOut();
              navigation.navigate('Home');
            }}
            style={{
              backgroundColor: '#ef4444',
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: '#fff', fontWeight: '600' }}>Sair</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={{
            backgroundColor: '#294381',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 20,
          }}
        >
          <Text style={{ color: '#fff', fontWeight: '600' }}>Login</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
