import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { Linking } from "react-native";
import { getBuyProject, BuyProject } from "../../../api/Services/Buy";

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
        console.log("❌ New Launch API error 👉", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 🔍 search filter
  const filteredProjects = projects.filter((item) => {
  const label = item.label?.toLowerCase() || "";
  const location = item.location?.toLowerCase() || "";
  const keyword = search.toLowerCase();

  if (!keyword) return true;

  return label.includes(keyword) || location.includes(keyword);
});


  const renderItem = ({ item }: { item: BuyProject }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => item.url && Linking.openURL(item.url)}
    >
      <Image
        source={{ uri: item.icon || "https://via.placeholder.com/150" }}
        style={styles.image}
      />
      <Text style={styles.title}>{item.label}</Text>
      <Text style={styles.location}>{item.location}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search Properties...."
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />

      <FlatList
        data={filteredProjects}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        numColumns={2}                     // ✅ no horizontal scroll
        columnWrapperStyle={{ gap: 10 }}
        contentContainerStyle={{ paddingTop: 12 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Buying;

const styles = StyleSheet.create({
  searchInput: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: "#ffffff",
    borderRadius: 6,
    color: "#000000",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8efefff",
  },
  card: {
    flex: 1,
    marginBottom: 14,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 5,
  },
  title: {
    fontWeight: "600",
    marginTop: 8,
  },
  location: {
    color: "#6B7280",
    marginTop: 4,
  },
});
