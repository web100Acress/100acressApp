import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { Linking } from "react-native";

import { fetchTrendingProjects } from "../../../api/Services/trendingService";
import type { TrendingProject } from "../../../api/types";

const handleCall = () => {
  const phoneNumber = "tel:+91 8500900100";
  Linking.openURL(phoneNumber).catch(() => {
    Alert.alert("Error", "Unable to open dialer");
  });
};

const TrendingProjects = () => {
  const [projects, setProjects] = useState<TrendingProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const data = await fetchTrendingProjects();
        if (mounted) setProjects(data);
      } catch (e) {
        console.log("Failed to load trending projects");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <View style={{ padding: 16 }}>
        <Text>Loading trending projects...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.sectionTitle}>Trending Projects</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {projects.map((item) => (
          <Pressable key={item._id} style={styles.card}>
            <Image source={{ uri: item.image as string }} style={styles.image} />

            <View style={styles.details}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>{item.price}</Text>
              <Text style={styles.location}>{item.location}</Text>
            </View>

            <View style={styles.actions}>
              <Pressable
                style={styles.exploreBtn}
                onPress={() =>
                  Linking.openURL(
                    `https://www.100acress.com/${item.slug}`
                  )
                }
              >
                <Text style={styles.exploreText}>Explore</Text>
              </Pressable>

              <Pressable onPress={handleCall} style={styles.iconBtn}>
                <Text>📞</Text>
              </Pressable>

              <Pressable style={styles.iconBtn}>
                <Text>💬</Text>
              </Pressable>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default TrendingProjects;

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginHorizontal: 16,
    marginTop: 24,
  },
  row: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginRight: 16,
    paddingBottom: 12,
    width: 280,
  },
  image: {
    width: "100%",
    height: 160,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  details: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
  },
  price: {
    color: "#E11D48",
    fontWeight: "600",
    marginTop: 4,
  },
  location: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginTop: 8,
  },
  exploreBtn: {
    flex: 1,
    backgroundColor: "#EF4444",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 8,
  },
  exploreText: {
    color: "#fff",
    fontWeight: "600",
  },
  iconBtn: {
    width: 48,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
    backgroundColor: "#ffe5e5ff",
  },
});
