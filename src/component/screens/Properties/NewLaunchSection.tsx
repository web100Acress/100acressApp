import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import {
  getNewLaunchProject,
  NewLaunchProject,
} from "../../../api/Services/NewLaunch"
import { Linking } from "react-native";

const NewLaunchSection = () => {
  const [projects, setProjects] = useState<NewLaunchProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNewLaunch();
  }, []);

  const loadNewLaunch = async () => {
    try {
      setLoading(true);
      const data = await getNewLaunchProject();
      setProjects(data);
    } catch (error) {
      console.log("❌ New Launch API error 👉", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Newly launched projects</Text>
      </View>

      <Text style={styles.subtitle}>
        Best prices • Unit of choice • Easy payment plan
      </Text>

      {loading && <Text>Loading new launch projects...</Text>}

      {/* Horizontal Scroll */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {projects.map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.newLaunchTag}>
              <Text style={styles.newLaunchText}>★ New launch ★</Text>
            </View>

            <View style={styles.row}>
              <Image source={{ uri: item.icon }} style={styles.image} />

              <View style={styles.details}>
                <Text style={styles.projectName}>{item.label}</Text>
                <Text style={styles.location}>📍{item.location}</Text>

                {/* Static placeholders (API doesn’t give these yet) */}
                <Text style={styles.price}>Price on request</Text>
                <Text style={styles.type}>Luxury Apartments</Text>
                <Text style={styles.growth}>High appreciation potential</Text>
              </View>
            </View>

            {/* BUTTON ROW */}
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => item.url && Linking.openURL(item.url)}
              >
                <Text style={styles.buttonText}>View Project</Text>
              </TouchableOpacity>

              <Pressable style={styles.iconBtn}>
                <Text style={styles.iconText}>💬</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

export default NewLaunchSection;


const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    marginBottom: 4,
  },
  title: {
    textAlign: 'left',
    fontSize: 20,
    fontWeight: "600",
  },
  subtitle: {
    color: '#666',
    marginBottom: 12,
  },

  card: {
    width: 320,
    marginRight: 12,
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 12,
    elevation: 2,
  },
  newLaunchTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFF3E0',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 6,
  },
  newLaunchText: {
    color: '#F57C00',
    fontWeight: '600',
    fontSize: 12,
  },

  row: {
    flexDirection: 'row',
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 20,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  projectName: {
    fontWeight: '700',
    fontSize: 16,
    color: '#222',
  },
  location: {
    color: '#555',
    fontSize: 13,
  },
  price: {
    fontWeight: '600',
    fontSize: 14,
    marginTop: 2,
  },
  type: {
    color: '#777',
    fontSize: 13,
  },
  growth: {
    color: 'green',
    marginTop: 4,
  },

  /* 🔥 BUTTON FLEX ROW */
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },

  button: {
    flex: 1,
    backgroundColor: '#d42929',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },

  iconBtn: {
    marginLeft: 8,
    width: 42,
    height: 42,
    borderRadius: 8,
    backgroundColor: '#fee8e8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 18,
  },
});
