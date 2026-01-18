import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  Dimensions,
} from "react-native";
import {
  getCommercialProject,
  commercialProject,
} from "../../../api/Services/Commercial";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.75;

const Commercial = () => {
  const [projects, setProjects] = useState<commercialProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLuxury();
  }, []);

  const loadLuxury = async () => {
    try {
      setLoading(true);
      const data = await getCommercialProject();
      setProjects(data);
    } catch (error) {
      console.log("❌ Luxury API error 👉", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ paddingVertical: 20 }}>
      {/* Section Heading */}
      <View style={{ paddingHorizontal: 16, marginBottom: 14 }}>
        <Text style={{ fontSize: 20, fontWeight: "800", color: "#111" }}>
          Commercial Projects in Delhi NCR
        </Text>
      </View>

      <FlatList
        data={projects}
        horizontal
        keyExtractor={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 10,
        }}
        ListEmptyComponent={
          !loading ? (
            <Text style={{ textAlign: "center", marginTop: 40 }}>
              No luxury projects found
            </Text>
          ) : null
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => item.url && Linking.openURL(item.url)}
            style={{
              width: CARD_WIDTH,
              backgroundColor: "#fff",
              borderRadius: 18,
              marginRight: 16,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 5 },
              elevation: 6,
            }}
          >
            {/* Image */}
            {item.icon ? (
              <Image
                source={{ uri: item.icon }}
                style={{
                  height: 170,
                  width: "100%",
                  borderTopLeftRadius: 18,
                  borderTopRightRadius: 18,
                }}
                resizeMode="cover"
              />
            ) : null}

            {/* Content */}
            <View style={{ padding: 12 }}>
              <Text
                numberOfLines={2}
                style={{
                  fontSize: 16,
                  fontWeight: "800",
                  color: "#111",
                }}
              >
                {item.label}
              </Text>

              <Text
                numberOfLines={1}
                style={{
                  color: "#666",
                  marginTop: 6,
                  fontSize: 13,
                }}
              >
                📍 {item.location}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Commercial;
