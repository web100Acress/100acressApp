import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

const LogOutProfile = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
     

      {/* PROFILE SECTION */}
      <View style={styles.profileBox}>
        <View style={styles.avatar}>
          <Text style={styles.avatarIcon}>👤</Text>
        </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
      >  
        <Text style={styles.loginTitle}>Login / Register</Text>
      </TouchableOpacity>
        <Text style={styles.loginSub}>
          Login and access millions of advertiser{'\n'}details on single click
        </Text>
      </View>

      {/* OPTIONS */}
      <View style={styles.list}>
        <ListItem title="Rate our App" />
        <ListItem title="Communication Settings" />
        <ListItem title="Share Feedback" />
      </View>

      {/* LOGIN BUTTON */}
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.loginBtnText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LogOutProfile;

const ListItem = ({ title }: { title: string }) => (
  <TouchableOpacity style={styles.item}>
    <Text style={styles.itemText}>{title}</Text>
    <Text style={styles.arrow}>›</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    flex: 1,
    backgroundColor: '#f8efefff',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8efefff',
    padding: 16,
    elevation: 3,
  },
  menu: {
    fontSize: 22,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },

  profileBox: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#f8efefff',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarIcon: {
    fontSize: 36,
  },
  loginTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#cf4040ff',
    marginBottom: 6,
  },
  loginSub: {
    textAlign: 'center',
    color: '#666',
    fontSize: 13,
  },

  list: {
    backgroundColor: '#fff',
    marginTop: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#EEE',
  },
  itemText: {
    fontSize: 15,
  },
  arrow: {
    fontSize: 20,
    color: '#999',
  },

  loginBtn: {
    marginTop: 'auto',
    padding: 18,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#EEE',
  },
  loginBtnText: {
    fontSize: 16,
    color: '#cf4040ff',
    fontWeight: '600',
  },
});
