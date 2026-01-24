import React, { useEffect, useState, useCallback, memo } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { getCommercialProject, commercialProject } from "../../../api/Services/Commercial";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.75;

// Card component ko alag rakha taaki sirf wahi render ho jo zaroori hai
const ProjectCard = memo(({ item, onOpen }: { item: commercialProject; onOpen: (url: string) => void }) => (
  <View style={styles.card}>
    <Image
      source={{ uri: item.icon || "https://via.placeholder.com/300x200" }}
      style={styles.cardImage}
      resizeMethod="resize" // Android Memory Fix
    />
    <View style={styles.cardContent}>
      <Text numberOfLines={1} style={styles.cardTitle}>{item.label}</Text>
      <Text numberOfLines={1} style={styles.cardLocation}>📍 {item.location}</Text>
      <TouchableOpacity
        onPress={() => item.url && onOpen(item.url)}
        style={styles.exploreBtn}
        activeOpacity={0.8}
      >
        <Text style={styles.exploreText}>Explore</Text>
      </TouchableOpacity>
    </View>
  </View>
));

const Commercial = () => {
  const [projects, setProjects] = useState<commercialProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getCommercialProject();
      setProjects(data);
    } catch (error) {
      console.log("❌ Commercial Error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenURL = useCallback((url: string) => {
    Linking.openURL(url).catch(() => null);
  }, []);

  const renderItem = useCallback(({ item }: { item: commercialProject }) => (
    <ProjectCard item={item} onOpen={handleOpenURL} />
  ), [handleOpenURL]);

  if (loading) return <ActivityIndicator size="small" color="#e60023" style={{ margin: 20 }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Commercial Projects</Text>
      <FlatList
        data={projects}
        horizontal
        renderItem={renderItem}
        keyExtractor={(item, index) => item.url || index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        snapToInterval={CARD_WIDTH + 16}
        decelerationRate="fast"
        removeClippedSubviews={true} // Android performance prop
        initialNumToRender={3}
      />
    </View>
  );
};

export default memo(Commercial);

const styles = StyleSheet.create({
  container: { paddingVertical: 10 },
  headingText: { fontSize: 18, fontWeight: "800", marginLeft: 16, marginBottom: 10, color: "#111" },
  listContent: { paddingHorizontal: 16 },
  card: { width: CARD_WIDTH, backgroundColor: "#fff", borderRadius: 12, marginRight: 16, elevation: 3, overflow: "hidden" },
  cardImage: { height: 150, width: "100%" },
  cardContent: { padding: 12 },
  cardTitle: { fontSize: 15, fontWeight: "bold" },
  cardLocation: { color: "#666", fontSize: 12, marginTop: 4 },
  exploreBtn: { marginTop: 10, backgroundColor: "#e60023", paddingVertical: 8, borderRadius: 6, alignItems: "center" },
  exploreText: { color: "#fff", fontWeight: "700", fontSize: 12 },
});