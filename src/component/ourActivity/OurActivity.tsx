import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getAllProject, AllProject } from "../../api/Services/AllProjects";

const OurActivity = () => {
  const [projects, setProjects] = useState<AllProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await getAllProject();
      setProjects(data);
    } catch (error) {
      console.log("API ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Our All Projects</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#B00020" />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {projects.map((item, index) => (
            <TouchableOpacity key={index} style={styles.card}>
              <Image
                source={{
                  uri:
                    item.icon ||
                    "https://via.placeholder.com/300x200.png?text=100Acress",
                }}
                style={styles.image}
              />

              <View style={styles.cardContent}>
                <Text style={styles.title} numberOfLines={2}>
                  {item.label}
                </Text>
                <Text style={styles.location} numberOfLines={1}>
                  📍 {item.location}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default OurActivity;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8efefff",
    padding: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    color: "#1a1a1a",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 180,
    backgroundColor: "#eee",
  },
  cardContent: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  location: {
    fontSize: 13,
    color: "#666",
  },
});

