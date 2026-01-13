import React, { useEffect } from "react";
import { View, Text, StyleSheet, Alert, Linking, ScrollView, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../Redux/trending/store";
import { fetchTrendingProjects } from "../../../Redux/trending/trendingSlice";

const TrendingProjects: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { projects, loading, error } = useSelector(
    (state: RootState) => state.trending
  );

  // Fetch trending projects on mount
  useEffect(() => {
    console.log("⚡ TrendingProjects mounted → dispatching fetchTrendingProjects");
    dispatch(fetchTrendingProjects());
  }, [dispatch]);

  const handleCall = () => {
    const phoneNumber = "tel:+918500900100";
    Linking.openURL(phoneNumber).catch(() => {
      Alert.alert("Error", "Unable to open dialer");
    });
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text>Loading trending projects...</Text>
      </View>
    );
  }

  if (error) {
    console.error("❌ TrendingProjects error:", error);
    return (
      <View style={styles.centered}>
        <Text>Failed to load trending projects.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingVertical: 16 }}>
      <Text style={styles.heading}>Recommended Projects</Text>

      {projects.length === 0 && (
        <Text style={{ textAlign: "center", marginTop: 16 }}>
          No trending projects available.
        </Text>
      )}

      {projects.map((project) => (
        <View key={project.id} style={styles.projectCard}>
          <Text style={styles.projectTitle}>{project.name}</Text>
          <Text>{project.location}</Text>
          <Text>{project.price}</Text>
          <Button title="View number" onPress={handleCall} />
        </View>
      ))}
    </ScrollView>
  );
};

export default TrendingProjects;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  projectCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2, // Android shadow
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
});



// Aaman pagal