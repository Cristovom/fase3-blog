import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { PostScreen } from '../screens/PostScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { AdminPostsScreen } from '../screens/AdminPostsScreen';
import { PostFormScreen } from '../screens/PostFormScreen';
import { UserListScreen } from '../screens/UserListScreen';
import { UserFormScreen } from '../screens/UserFormScreen';

const Stack = createNativeStackNavigator();

export function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* BLOG PÚBLICO */}
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Post" component={PostScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />

      {/* ADMIN (rotas SEMPRE registradas) */}
      <Stack.Screen name="AdminPosts" component={AdminPostsScreen} />
      <Stack.Screen name="PostForm" component={PostFormScreen} />
      <Stack.Screen
        name="Teachers"
        component={UserListScreen}
        initialParams={{ role: 'teacher' }}
      />
      <Stack.Screen
        name="Students"
        component={UserListScreen}
        initialParams={{ role: 'student' }}
      />
      <Stack.Screen name="UserForm" component={UserFormScreen} />
    </Stack.Navigator>
  );
}
