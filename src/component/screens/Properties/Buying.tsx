import React, { useEffect, useState, useCallback, useMemo, memo } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Linking,
  ActivityIndicator,
} from "react-native";
import { getBuyProject, BuyProject } from "../../../api/Services/Buy";

// 1. Project Card ko Memoize karein taaki search ke waqt cards refresh na hon
const ProjectCard = memo(({ item }: { item: BuyProject }) => (
  <TouchableOpacity
    style={styles.card}
    activeOpacity={0.7}
    onPress={() => item.url && Linking.openURL(item.url)}
  >
    <Image
      source={{ uri: item.icon || "https://via.placeholder.com/150" }}
      style={styles.image}
      resizeMethod="resize" // Android image performance fix
    />
    <View style={styles.info}>
      <Text numberOfLines={1} style={styles.title}>{item.label}</Text>
      <Text numberOfLines={1} style={styles.location}>📍 {item.location}</Text>
    </View>
  </TouchableOpacity>
));

const Buying = () => {
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState<BuyProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getBuyProject();
        setProjects(data);
      } catch (err) {
        console.log("❌ Buying API error 👉", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 2. Search logic ko useMemo mein rakha (Performance Fix)
  const filteredProjects = useMemo(() => {
    const keyword = search.toLowerCase().trim();
    if (!keyword) return projects;

    return projects.filter((item) => {
      const label = item.label?.toLowerCase() || "";
      const location = item.location?.toLowerCase() || "";
      return label.includes(keyword) || location.includes(keyword);
    });
  }, [search, projects]);

  // 3. Render function ko useCallback mein rakha
  const renderItem = useCallback(({ item }: { item: BuyProject }) => (
    <ProjectCard item={item} />
  ), []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          placeholder="Search Properties...."
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#e60023" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={filteredProjects}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          // Android specific performance props
          removeClippedSubviews={true}
          initialNumToRender={6}
          maxToRenderPerBatch={6}
          windowSize={5}
          ListEmptyComponent={
            !loading && <Text style={styles.emptyText}>No properties found</Text>
          }
        />
      )}
    </View>
  );
};

export default Buying;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8efefff",
  },
  header: {
    padding: 16,
    backgroundColor: "#f8efefff",
  },
  searchInput: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    color: "#000000",
    elevation: 3, // Android shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  card: {
    width: "48%", // 2 columns properly aligned
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 120,
  },
  info: {
    padding: 10,
  },
  title: {
    fontWeight: "700",
    fontSize: 14,
    color: "#111",
  },
  location: {
    color: "#6B7280",
    marginTop: 4,
    fontSize: 12,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    color: "#666",
  },
});