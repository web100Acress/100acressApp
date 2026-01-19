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

import {
  getRentProject,
  RentProject,
} from "../../../api/Services/rent"; // 👈 path check kar lena

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

  // 🔍 search filter
  const filteredProjects = projects.filter((item) => {
  const label = item.label?.toString().toLowerCase() || "";
  const location = item.location?.toString().toLowerCase() || "";
  const keyword = search.toLowerCase();

  if (!keyword) return true;  

  return label.includes(keyword) || location.includes(keyword);
});

  const renderItem = ({ item }: { item: RentProject }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => item.url && Linking.openURL(item.url)}
    >
      <Image
        source={{ uri: item.icon || "https://via.placeholder.com/150" }}
        style={styles.image}
      />
      <Text style={styles.label}>{item.label}</Text>
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
        style={{ flex:1 }}
        data={filteredProjects}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        numColumns={2}                    
        columnWrapperStyle={{ gap: 10 }}
        contentContainerStyle={{ paddingTop: 12 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Rent;

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
  label: {
    fontWeight: "600",
    marginTop: 8,
  },
  location: {
    color: "#6B7280",
    marginTop: 4,
  },
});
