import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Linking,
} from "react-native";
import { getLuxuryProjects, LuxuryProject } from "../../../api/Services/Luxury";

const { width } = Dimensions.get("window");

export default function TopLuxuryAPI() {
  const [projects, setProjects] = useState<LuxuryProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLuxury();
  }, []);

  const loadLuxury = async () => {
    try {
      setLoading(true);
      const data = await getLuxuryProjects();
      console.log("✅ Final Mapped Projects =>", data);
      setProjects(data);
    } catch (error) {
      console.log("❌ Luxury API error 👉", error);
    } finally {
      setLoading(false);
    }
  };

  const ProjectCard = ({ item }: { item: LuxuryProject }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => item.url && Linking.openURL(item.url)}
    >
      {/* TOP IMAGE */}
      {item.icon ? (
        <Image source={{ uri: item.icon }} style={styles.image} />
      ) : null}

      {/* FEATURED TAG */}
      <View style={styles.featuredTag}>
        <Text style={styles.featuredText}>Featured</Text>
      </View>

      {/* INFO CARD */}
      <View style={styles.infoWrapper}>
        {/* CIRCULAR IMAGE */}
        <View style={styles.circleWrapper}>
          {item.icon && <Image source={{ uri: item.icon }} style={styles.circleImage} />}
        </View>

        <Text style={styles.title}>{item.label}</Text>
        <Text style={styles.location}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Top Luxury Apartments</Text>

      {loading && <Text>Loading luxury projects...</Text>}

      <FlatList
        data={projects}
        horizontal
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <ProjectCard item={item} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        ListEmptyComponent={
          !loading ? (
            <Text style={{ textAlign: "center", marginTop: 40 }}>
              No luxury projects found
            </Text>
          ) : null
        }
      />
    </View>
  );
}

/* -------------------- STYLES -------------------- */
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingLeft: 16,
  },
  heading: {
    marginVertical: 20,
    fontSize: 22,
    fontWeight: "bold",
    color: "#1f2c3d",
  },
  card: {
    width: width * 0.75,
    height: 420,
    borderRadius: 24,
    backgroundColor: "#ffe5e5ff",
    marginRight: 16,
    overflow: "hidden",
    elevation: 8,
  },
  image: {
    width: "100%",
    height: "70%",
  },
  featuredTag: {
    position: "absolute",
    top: 14,
    left: 14,
    backgroundColor: "#7E2EFF",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  featuredText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  infoWrapper: {
    position: "absolute",
    bottom: 14,
    left: 14,
    right: 14,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingTop: 40,
    paddingBottom: 16,
    paddingHorizontal: 16,
    alignItems: "center",
    elevation: 6,
  },
  circleWrapper: {
    position: "absolute",
    top: -32,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  circleImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: "#fff",
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1f2c3d",
    marginTop: 8,
    textAlign: "center",
  },
  location: {
    fontSize: 13,
    color: "#7d8da6",
    marginTop: 2,
  },
});
