import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  TextInput,
  ImageComponent,
} from "react-native";
import { getAllProject, AllProject } from "../../api/Services/AllProjects";

const OurActivity = () => {
  const [projects, setProjects] = useState<AllProject[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<AllProject[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await getAllProject();
      setProjects(data);
      setFilteredProjects(data); // initial list
    } catch (error) {
      console.log("API ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text: string) => {
    setSearch(text);

    if (text.trim() === "") {
      setFilteredProjects(projects);
      return;
    }

    const filtered = projects.filter(item =>
      item.label?.toLowerCase().includes(text.toLowerCase()) ||
      item.location?.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredProjects(filtered);
  };

  const renderItem = ({ item }: { item: AllProject }) => (
    <TouchableOpacity style={styles.card}>
      <Image
        source={{
          uri:
            item.icon ||
            "https://via.placeholder.com/300x200.png?text=100Acress",
        }}
        style={styles.image}
      />

      <View style={styles.cardContent}>
        <Text style={styles.title} numberOfLines={2}>
          {item.label}
        </Text>
        <Text style={styles.location} numberOfLines={1}>
          📍 {item.location}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Projects: </Text>

      {/* 🔍 Search Box */}
      <TextInput
        placeholder="Search project or location..."
        value={search}
        onChangeText={handleSearch}
        style={styles.searchInput}
        placeholderTextColor="#999"
      />

      {loading ? (
        <ActivityIndicator size="large" color="#B00020" />
      ) : (
        <FlatList
          data={filteredProjects}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            // <Text style={styles.emptyText}>No projects found 😕</Text>
            <Image
              source={require("../../public/assets/icon/nofound-removebg-preview.png")}
              style={{ width: 550, height: 550, alignSelf: "center", marginTop: 20 }}
            />
          }
        />
      )}
    </View>
  );
};

export default OurActivity;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8efefff",
    padding: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
    color: "#1a1a1a",
  },
  searchInput: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 14,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginBottom: 16,
    width: "48%",
    overflow: "hidden",
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 120,
    backgroundColor: "#eee",
  },
  cardContent: {
    padding: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  location: {
    fontSize: 12,
    color: "#666",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#999",
  },
});
