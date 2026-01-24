import React, { useEffect, useState, useCallback, memo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList, // ScrollView ki jagah FlatList
  ImageBackground,
  TouchableOpacity,
  Linking,
  Alert,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import {
  getScoplotProjects,
  ScoplotProject,
} from "../../../api/Services/SeoPlots";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.8;
const CARD_HEIGHT = 260;

// 1. Memoized Card Component for Smooth Scrolling
const SeoCard = memo(({ item, onOpen }: { item: ScoplotProject; onOpen: (url: string) => void }) => (
  <View style={styles.card}>
    <ImageBackground
      source={{
        uri: item.icon || "https://via.placeholder.com/400x300?text=No+Image",
      }}
      style={styles.image}
      imageStyle={{ borderRadius: 18 }}
      resizeMethod="resize" // Android Fix
      fadeDuration={0}      // Instant Load
    >
      {/* Dark Overlay */}
      <View style={styles.overlay} />

      {/* Info Box */}
      <View style={styles.infoBox}>
        <Text style={styles.title} numberOfLines={1}>
          {item.label}
        </Text>

        <Text style={styles.location} numberOfLines={1}>
          📍 {item.location}
        </Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.exploreBtn}
            activeOpacity={0.8}
            onPress={() => item.url && onOpen(item.url)}
          >
            <Text style={styles.exploreText}>Explore</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  </View>
));

const SeoProject: React.FC = () => {
  const [projects, setProjects] = useState<ScoplotProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await getScoplotProjects();
      setProjects(data);
    } catch (error) {
      console.log("❌ API Error 👉", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Stable function reference
  const handleOpenURL = useCallback((url: string) => {
    Linking.openURL(url).catch(() => Alert.alert("Error", "Unable to open link"));
  }, []);

  // 3. Render Item function
  const renderItem = useCallback(({ item }: { item: ScoplotProject }) => (
    <SeoCard item={item} onOpen={handleOpenURL} />
  ), [handleOpenURL]);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.heading}>SCO Projects in Gurugram</Text>

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
          // ⚡️ Android Smoothness Props
          removeClippedSubviews={true}
          initialNumToRender={2}
          maxToRenderPerBatch={2}
          windowSize={3}
          snapToInterval={CARD_WIDTH + 16}
          decelerationRate="fast"
          ListEmptyComponent={<Text style={{ marginLeft: 16 }}>No projects found</Text>}
        />
      )}
    </View>
  );
};

export default memo(SeoProject);

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 15,
  },
  heading: {
    fontSize: 20,
    fontWeight: "800",
    marginLeft: 16,
    marginBottom: 12,
    color: "#111",
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginRight: 16,
    borderRadius: 18,
    backgroundColor: "#eee", // Placeholder color while loading
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)", // Thoda dark for better text visibility
    borderRadius: 18,
  },
  infoBox: {
    backgroundColor: "#fff",
    margin: 12,
    borderRadius: 14,
    padding: 12,
    elevation: 5, // Shadow on Android
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
    marginBottom: 2,
  },
  location: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  exploreBtn: {
    flex: 1,
    backgroundColor: "#e60023",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  exploreText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },
});