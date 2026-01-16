import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { getLuxuryProjects, LuxuryProject } from "../../api/Services/Luxury";

const OurActivity = () => {
  const [projects, setProjects] = useState<LuxuryProject[]>([]);
const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLuxury();
  }, []);

  const loadLuxury = async () => {
  try {
    setLoading(true);
    const data = await getLuxuryProjects();
    setProjects(data);
  } catch (error) {
    console.log("Luxury API error 👉", error);
  } finally {
    setLoading(false);
  }
};

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 12 }}>
        Luxury Projects
      </Text>

      <FlatList
  data={projects}
  keyExtractor={(_, index) => index.toString()}
  ListEmptyComponent={
    !loading ? (
      <Text style={{ textAlign: "center", marginTop: 40 }}>
        No luxury projects found
      </Text>
    ) : null
  }
  ListHeaderComponent={
    loading ? (
      <Text style={{ textAlign: "center", marginVertical: 20 }}>
        Loading luxury projects...
      </Text>
    ) : null
  }
  renderItem={({ item }) => (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ fontWeight: "600" }}>{item.label}</Text>
      <Text>{item.location}</Text>
    </View>
  )}
/>

    </View>
  );
};

export default OurActivity;
