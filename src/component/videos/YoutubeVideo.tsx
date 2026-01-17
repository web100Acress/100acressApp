import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { getLuxuryProjects, LuxuryProject } from "../../api/Services/Luxury";
import { Linking } from "react-native";

const YoutubeVideo = () => {
  const [projects, setProjects] = useState<LuxuryProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("📌 YoutubeVideo mounted");
    loadLuxury();
  }, []);

  const loadLuxury = async () => {
    try {
      setLoading(true);
      const data = await getLuxuryProjects();
      console.log("✅ Final Mapped Projects =>", data);
      setProjects(data);
    } catch (error) {
      console.log("❌ Luxury API error 👉", error);
    } finally {
      setLoading(false);
    }
  };

  console.log("🧪 projects length =>", projects.length);

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 12 }}>
        Luxury Projects
      </Text>

      {loading && <Text>Loading luxury projects...</Text>}

      <FlatList
        data={projects}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !loading ? (
            <Text style={{ textAlign: "center", marginTop: 40 }}>
              No luxury projects found
            </Text>
          ) : null
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 12,
              marginBottom: 12,
              elevation: 3,
            }}
            activeOpacity={0.8}
            onPress={() => item.url && Linking.openURL(item.url)}
          >
            {item.icon ? (
              <Image
                source={{ uri: item.icon }}
                style={{
                  height: 160,
                  borderRadius: 10,
                  marginBottom: 8,
                }}
                resizeMode="cover"
              />
            ) : null}

            <Text style={{ fontWeight: "700", fontSize: 15 }}>
              {item.label}
            </Text>

            <Text style={{ color: "#666", marginTop: 4 }}>
              {item.location}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default YoutubeVideo;
