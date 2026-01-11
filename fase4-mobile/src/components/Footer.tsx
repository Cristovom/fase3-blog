import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';

const styles = StyleSheet.create({
  bar: {
    backgroundColor: "#000",
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: "100%",
    alignItems: "center",   // justify-content: center (horizontal)
  },

  wrap: {
    width: "100%",
    maxWidth: 960,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12, // funciona no RN moderno (0.71+ / Expo)
  },

  left: {
    flexDirection: "row",
  },

  link: {
    color: "#F4E9D7",
    fontSize: 14,
    lineHeight: 20,
  },
});

export function Footer() {
  return (
    <View style={styles.bar}>
      <View style={styles.wrap}>
        <View style={styles.left}>
          <Text style={styles.link}>
            Todos os direitos reservados ©
          </Text>
        </View>
      </View>
    </View>
  );
}