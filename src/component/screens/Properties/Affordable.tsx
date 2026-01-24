import React, { useEffect, useState, useCallback, memo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList, 
  Image,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import {
  getAffordableProjects,
  AffordableProject,
} from "../../../api/Services/Affordable";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.7;

// 1. Memoized Card Component
const ProjectCard = memo(({ item, onOpen }: { item: AffordableProject; onOpen: (url: string) => void }) => (
  <View style={styles.card}>
    <Image
      source={{
        uri: item.icon || "https://via.placeholder.com/300x200?text=No+Image",
      }}
      style={styles.image}
      resizeMethod="resize" // Android Optimization
    />

    <View style={styles.info}>
      <Text style={styles.title} numberOfLines={1}>
        {item.label}
      </Text>

      <Text style={styles.location} numberOfLines={1}>
        📍 {item.location}
      </Text>

      <TouchableOpacity
        style={styles.exploreBtn}
        onPress={() => item.url && onOpen(item.url)}
        activeOpacity={0.8}
      >
        <Text style={styles.exploreText}>Explore</Text>
      </TouchableOpacity>
    </View>
  </View>
));

const Affordable = () => {
  const [projects, setProjects] = useState<AffordableProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getAffordableProjects();
      setProjects(data);
    } catch (err) {
      console.log("❌ Affordable API Error", err);
    } finally {
      setLoading(false);
    }
  };

  // 2. useCallback for stable reference
  const handleOpenLink = useCallback((url: string) => {
    Linking.openURL(url).catch(() => console.log("❌ Unable to open URL"));
  }, []);

  // 3. FlatList renderItem function
  const renderItem = useCallback(({ item }: { item: AffordableProject }) => (
    <ProjectCard item={item} onOpen={handleOpenLink} />
  ), [handleOpenLink]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Affordable Homes in Gurgaon</Text>

      {loading ? (
        <ActivityIndicator color="#e60023" style={{ marginLeft: 16 }} />
      ) : (
        <FlatList
          data={projects}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 10 }}
          // Performance Props
          removeClippedSubviews={true}
          initialNumToRender={3}
          maxToRenderPerBatch={3}
          windowSize={5}
          snapToInterval={CARD_WIDTH + 16}
          decelerationRate="fast"
        />
      )}
    </View>
  );
};

export default memo(Affordable);

const styles = StyleSheet.create({
  container: {
    marginTop: 10, // Negative margin scroll ko obstruct kar sakta hai, isliye 10 rakha hai
  },
  heading: {
    fontSize: 19,
    fontWeight: "800",
    marginLeft: 16,
    marginBottom: 12,
    color: "#111",
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 14,
    marginRight: 16,
    overflow: "hidden",
    elevation: 4,
    marginBottom: 5,
  },
  image: {
    width: "100%",
    height: 140,
    backgroundColor: "#f0f0f0",
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#111",
  },
  location: {
    marginTop: 4,
    fontSize: 12,
    color: "#666",
  },
  exploreBtn: {
    marginTop: 10,
    backgroundColor: "#e60023",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  exploreText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },
});