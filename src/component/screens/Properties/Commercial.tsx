import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Dimensions,
} from "react-native";
import {
  getCommercialProject,
  commercialProject,
} from "../../../api/Services/Commercial";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.75;

const Commercial = () => {
  const [projects, setProjects] = useState<commercialProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCommercial();
  }, []);

  const loadCommercial = async () => {
    try {
      setLoading(true);
      const data = await getCommercialProject();
      setProjects(data);
    } catch (error) {
      console.log("❌ Commercial API error 👉", error);
    } finally {
      setLoading(false);
    }
  };

  const openURL = (url: string) => {
    Linking.openURL(url).catch(() =>
      console.log("❌ Unable to open URL")
    );
  };

  return (
    <View style={styles.container}>
      {/* Section Heading */}
      <View style={styles.headingWrapper}>
        <Text style={styles.headingText}>
          Commercial Projects in Delhi NCR
        </Text>
      </View>

      <FlatList
        data={projects}
        horizontal
        keyExtractor={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.icon && (
              <Image
                source={{ uri: item.icon }}
                style={styles.cardImage}
                resizeMode="cover"
              />
            )}

            <View style={styles.cardContent}>
              <Text numberOfLines={2} style={styles.cardTitle}>
                {item.label}
              </Text>

              <Text numberOfLines={1} style={styles.cardLocation}>
                📍 {item.location}
              </Text>

              <TouchableOpacity
                onPress={() => item.url && openURL(item.url)}
                activeOpacity={0.85}
                style={styles.exploreBtn}
              >
                <Text style={styles.exploreText}>Explore</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Commercial;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },

  headingWrapper: {
    paddingHorizontal: 16,
    marginBottom: 14,
  },

  headingText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111",
  },

  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },

  card: {
    width: CARD_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 18,
    marginRight: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
  },

  cardImage: {
    height: 170,
    width: "100%",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },

  cardContent: {
    padding: 12,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111",
  },

  cardLocation: {
    color: "#666",
    marginTop: 6,
    fontSize: 13,
  },

  exploreBtn: {
    marginTop: 12,
    backgroundColor: "#e60023",
    paddingVertical: 9,
    borderRadius: 10,
    alignItems: "center",
  },

  exploreText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },
});
