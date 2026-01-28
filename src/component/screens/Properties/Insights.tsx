// ProfileScreen.js
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProfileScreen({  }) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://via.placeholder.com/100' }}
        style={styles.avatar}
      />

      <Text style={styles.name}>Aman Tiwari</Text>
      <Text style={styles.email}>amankumartiwari5255@gmail.com</Text>

      <TouchableOpacity
        style={styles.button}
        // onPress={() => navigation.navigate('Settings')}
      >
        <Text style={styles.buttonText}>Go to Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        // style={styles.link}
        // onPress={() => navigation.navigate('CreateAccount')}
      >
        <Text style={styles.linkText}>Create New Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  name: { fontSize: 20, fontWeight: 'bold' },
  email: { color: '#666', marginBottom: 20 },
  button: {
    backgroundColor: '#ff3b30',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  linkText: { color: '#ff3b30' },
});
