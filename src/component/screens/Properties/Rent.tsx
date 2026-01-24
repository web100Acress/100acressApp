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

import { getRentProject, RentProject } from "../../../api/Services/rent";

// 1. Card ko Memoize karein taaki search ke waqt cards dobara render na hon
const RentCard = memo(({ item }: { item: RentProject }) => (
  <TouchableOpacity
    style={styles.card}
    activeOpacity={0.8}
    onPress={() => item.url && Linking.openURL(item.url)}
  >
    <Image
      source={{ uri: item.icon || "https://via.placeholder.com/150" }}
      style={styles.image}
      resizeMethod="resize" // Android optimization
    />
    <View style={styles.textContainer}>
      <Text numberOfLines={1} style={styles.label}>{item.label}</Text>
      <Text numberOfLines={1} style={styles.location}>📍 {item.location}</Text>
    </View>
  </TouchableOpacity>
));

const Rent = () => {
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState<RentProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getRentProject();
        setProjects(data);
      } catch (err) {
        console.log("❌ Rent API error 👉", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 2. useMemo ka use karein: Filtering sirf tab hogi jab 'search' ya 'projects' badlenge
  const filteredProjects = useMemo(() => {
    const keyword = search.toLowerCase().trim();
    if (!keyword) return projects;

    return projects.filter((item) => {
      const label = item.label?.toString().toLowerCase() || "";
      const location = item.location?.toString().toLowerCase() || "";
      return label.includes(keyword) || location.includes(keyword);
    });
  }, [search, projects]);

  // 3. useCallback taaki function recreate na ho
  const renderItem = useCallback(({ item }: { item: RentProject }) => (
    <RentCard item={item} />
  ), []);

  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <TextInput
          placeholder="Search Properties...."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
          placeholderTextColor="#9CA3AF"
        />
      </View>

      {loading ? (
        <ActivityIndicator color="#e60023" size="large" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={filteredProjects}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          // Performance props
          removeClippedSubviews={true}
          initialNumToRender={6}
          maxToRenderPerBatch={6}
          windowSize={5}
        />
      )}
    </View>
  );
};

export default Rent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8efefff",
  },
  searchWrapper: {
    padding: 16,
    backgroundColor: "#f8efefff",
  },
  searchInput: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    color: "#000000",
    elevation: 2, // Halka shadow search box ke liye
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  card: {
    width: "48%", // 2 columns ke liye
    backgroundColor: "#fff",
    marginBottom: 16,
    borderRadius: 8,
    overflow: "hidden",
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 120,
  },
  textContainer: {
    padding: 8,
  },
  label: {
    fontWeight: "700",
    fontSize: 14,
    color: "#111",
  },
  location: {
    color: "#6B7280",
    marginTop: 4,
    fontSize: 12,
  },
});