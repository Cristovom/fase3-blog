import { View, Text, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { getPostById, Post } from '../services/posts';

export function PostScreen({ route }: any) {
  const { id } = route.params;
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    getPostById(id).then(setPost);
  }, [id]);

  if (!post) return null;

  return (
    <View style={{ flex: 1 }}>
      <Header />

      <ScrollView style={{ flex: 1, padding: 16 }}>
        <Text style={{ fontSize: 26, fontWeight: 'bold', marginBottom: 12 }}>
          {post.titulo}
        </Text>

        <Text style={{ color: '#555', marginBottom: 20 }}>
          Autor: {post.autor}
        </Text>

        <Text style={{ fontSize: 16, lineHeight: 26 }}>
          {post.conteudo}
        </Text>
      </ScrollView>

      <Footer />
    </View>
  );
}
