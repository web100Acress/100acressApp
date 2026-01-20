import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
  Dimensions,
} from "react-native";

import { getTrendingProject } from "../../../api/Services/Trending";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.7;

type Project = {
  id: number;
  title: string;
  location: string;
  price: string;
  image: string;
  url: string;
  phone?: string;
  whatsapp?: string;
};

const TrendingProjectsCarousel: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchTrending();
  }, []);

  const fetchTrending = async () => {
    try {
      const res = await getTrendingProject();

      console.log("✅ MAPPED TRENDING 👉", res);

      const mapped: Project[] = res.map((item, index) => ({
        id: index + 1,
        title: item.label,
        location: item.location,
        price: "Price on Request",
        image: item.icon,
        url: item.url,
        phone: "+918500900100",
        whatsapp: "+918500900100",
      }));

      setProjects(mapped);
    } catch (e) {
      console.log("❌ Trending component error", e);
    }
  };

  const handleOpenURL = (url: string) => {
    if (!url) return;
    Linking.openURL(url).catch(() =>
      Alert.alert("Error", "Unable to open URL")
    );
  };

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`).catch(() =>
      Alert.alert("Error", "Unable to call")
    );
  };

  const handleWhatsApp = (number: string) => {
    const url = `https://wa.me/${number.replace(/[^0-9]/g, "")}`;
    Linking.openURL(url).catch(() =>
      Alert.alert("Error", "Unable to open WhatsApp")
    );
  };

  return (
    <View style={{ paddingVertical: 16 }}>
      <Text style={styles.heading}>Trending Projects</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {projects.map((project) => (
          <View key={project.id} style={styles.card}>
            <Image source={{ uri: project.image }} style={styles.image} />

            <View style={{ padding: 8 }}>
              <Text style={styles.title}>{project.title}</Text>
              <Text style={styles.price}>{project.price}</Text>
              <Text style={styles.location}>📍{project.location}</Text>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "#e60023" }]}
                  onPress={() => handleOpenURL(project.url)}
                >
                  <Text style={styles.buttonText}>Explore</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "#f6d0d0" }]}
                  onPress={() => handleCall(project.phone!)}
                >
                  <Text style={styles.buttonText}>📞</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "#b2fcce" }]}
                  onPress={() => handleWhatsApp(project.whatsapp!)}
                >
                  <Text style={styles.buttonText}>💬</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default TrendingProjectsCarousel;

const styles = StyleSheet.create({
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 16,
    marginBottom: 12,
  },
  card: {
    width: CARD_WIDTH,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginRight: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 180,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  price: {
    color: "#e60023",
    fontWeight: "bold",
    marginBottom: 2,
  },
  location: {
    fontSize: 12,
    color: "#555",
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
