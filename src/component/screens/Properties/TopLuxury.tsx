import React, { useEffect, useState, useCallback, memo } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from "react-native";
import { getLuxuryProjects, LuxuryProject } from "../../../api/Services/Luxury";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.75;

// 1. ProjectCard ko memoize kiya taaki unnecessary re-render na ho
const ProjectCard = memo(({ item, onPress }: { item: LuxuryProject, onPress: (url: string) => void }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => item.url && onPress(item.url)}
    >
      {/* TOP IMAGE - Added resizeMethod for Android optimization */}
      {item.icon ? (
        <Image 
          source={{ uri: item.icon }} 
          style={styles.image} 
          resizeMethod="scale"
        />
      ) : (
        <View style={[styles.image, { backgroundColor: '#ddd' }]} />
      )}

      {/* FEATURED TAG */}
      <View style={styles.featuredTag}>
        <Text style={styles.featuredText}>Featured</Text>
      </View>

      {/* INFO CARD */}
      <View style={styles.infoWrapper}>
        <View style={styles.circleWrapper}>
          {item.icon && (
            <Image 
              source={{ uri: item.icon }} 
              style={styles.circleImage} 
            />
          )}
        </View>

        <Text style={styles.title} numberOfLines={1}>{item.label}</Text>
        <Text style={styles.location} numberOfLines={1}>📍 {item.location}</Text>
      </View>
    </TouchableOpacity>
  );
});

const TopLuxuryAPI = () => {
  const [projects, setProjects] = useState<LuxuryProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLuxury();
  }, []);

  const loadLuxury = async () => {
    try {
      const data = await getLuxuryProjects();
      setProjects(data);
    } catch (error) {
      console.log("❌ Luxury API error 👉", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. onPress function ko useCallback mein rakha
  const handlePress = useCallback((url: string) => {
    Linking.openURL(url).catch(() => console.log("Couldn't open URL"));
  }, []);

  // 3. Render function for FlatList
  const renderItem = useCallback(({ item }: { item: LuxuryProject }) => (
    <ProjectCard item={item} onPress={handlePress} />
  ), [handlePress]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Top Luxury Apartments</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#7E2EFF" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={projects}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listPadding}
          // Android Performance Props
          removeClippedSubviews={true}
          initialNumToRender={2}
          maxToRenderPerBatch={2}
          windowSize={3}
          decelerationRate="fast"
          snapToInterval={CARD_WIDTH + 16}
        />
      )}
    </View>
  );
};

export default memo(TopLuxuryAPI);

/* -------------------- STYLES -------------------- */
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  heading: {
    paddingLeft: 16,
    marginVertical: 15,
    fontSize: 22,
    fontWeight: "bold",
    color: "#1f2c3d",
  },
  listPadding: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 20,
  },
  card: {
    width: CARD_WIDTH,
    height: 380, // Thoda kam height for better fit
    borderRadius: 24,
    backgroundColor: "#fff", // Standard white background better rehta hai
    marginRight: 16,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: "65%",
  },
  featuredTag: {
    position: "absolute",
    top: 14,
    left: 14,
    backgroundColor: "#7E2EFF",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  featuredText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },
  infoWrapper: {
    position: "absolute",
    bottom: 12,
    left: 12,
    right: 12,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingTop: 35,
    paddingBottom: 15,
    paddingHorizontal: 10,
    alignItems: "center",
    // Shadow ko container ke bajaye yahan halka rakhein
    elevation: 3,
  },
  circleWrapper: {
    position: "absolute",
    top: -28,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  circleImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#eee",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1f2c3d",
    textAlign: "center",
  },
  location: {
    fontSize: 12,
    color: "#7d8da6",
    marginTop: 2,
  },
});