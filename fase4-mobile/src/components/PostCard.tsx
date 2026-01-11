import { View, Text, TouchableOpacity } from 'react-native';

type Props = {
  title: string;
  description: string;
  author: string;
  date: string;
  onPress: () => void;
};

export function PostCard({ title, description, author, date, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#e5e7eb',
      }}
    >
      <View style={{ marginBottom: 8 }}>
        <Text style={{ color: '#294381', fontSize: 12, fontWeight: '600' }}>
          Novidade • 5 min
        </Text>
      </View>

      <Text style={{ fontSize: 18, fontWeight: '700', color: '#212225' }}>
        {title}
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
        {description}
      </Text>

      <View
        style={{
          marginTop: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ color: '#294381', fontSize: 12 }}>
          👤 {author}
        </Text>
        <Text style={{ color: '#294381', fontSize: 12 }}>
          📅 {date}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
