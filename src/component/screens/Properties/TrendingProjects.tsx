import React, { useEffect, useState, useCallback, memo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
  Dimensions,
  ImageBase,
} from "react-native";
import { getTrendingProject } from "../../../api/Services/Trending";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.75; // Thoda bada card for better visibility

type Project = {
  id: number;
  title: string;
  location: string;
  price: string;
  image: string;
  url: string;
  phone?: string;
  whatsapp?: string;
};

// 1. Separate Memoized Card Component (Android Optimization)
const ProjectCard = memo(({ item, onOpen, onCall, onWA }: { 
  item: Project, 
  onOpen: (url: string) => void, 
  onCall: (phone: string) => void, 
  onWA: (num: string) => void 
}) => (
  <View style={styles.card}>
    <Image 
      source={{ uri: item.image }} 
      style={styles.image} 
      resizeMode="cover"
    />
    <View style={styles.cardContent}>
      <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
      <Text style={styles.price}>{item.price}</Text>
      <Text style={styles.location} numberOfLines={1}>📍 {item.location}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#e60023" }]}
          onPress={() => onOpen(item.url)}
        >
          <Text style={styles.buttonText}>Explore</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.iconButton, { backgroundColor: "#f6d0d0" }]}
          onPress={() => onCall(item.phone!)}
        >
          <Text>📞</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.iconButton, { backgroundColor: "#fee8e8" }]}
          onPress={() => onWA(item.whatsapp!)}
        >
          <Image
            source={require("../../../public/assets/icon/whatsapp.png")}
            style={styles.whatsappIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>


      </View>
    </View>
  </View>
));

const TrendingProjectsCarousel: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchTrending();
  }, []);

  const fetchTrending = async () => {
    try {
      const res = await getTrendingProject();
      const mapped: Project[] = res.map((item, index) => ({
        id: index + 1,
        title: item.label,
        location: item.location,
        price: "Price on Request",
        image: item.icon,
        url: item.url,
        phone: "+918500900100",
        whatsapp: "+918500900100",
      }));
      setProjects(mapped);
    } catch (e) {
      console.log("❌ Trending error", e);
    }
  };

  // 2. UseCallback to prevent function re-creation on every render
  const handleOpenURL = useCallback((url: string) => {
    if (url) Linking.openURL(url).catch(() => Alert.alert("Error", "Unable to open URL"));
  }, []);

  const handleCall = useCallback((phone: string) => {
    Linking.openURL(`tel:${phone}`).catch(() => Alert.alert("Error", "Unable to call"));
  }, []);

  const handleWhatsApp = useCallback((number: string) => {
    const url = `https://wa.me/${number.replace(/[^0-9]/g, "")}`;
    Linking.openURL(url).catch(() => Alert.alert("Error", "Unable to open WhatsApp"));
  }, []);

  // 3. Render Item function
  const renderItem = useCallback(({ item }: { item: Project }) => (
    <ProjectCard 
      item={item} 
      onOpen={handleOpenURL} 
      onCall={handleCall} 
      onWA={handleWhatsApp} 
    />
  ), [handleOpenURL, handleCall, handleWhatsApp]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Trending Projects</Text>

      <FlatList
        data={projects}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listPadding}
        // Performance Props
        removeClippedSubviews={true} 
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={5}
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH + 16} // Snapping effect
      />
    </View>
  );
};

export default memo(TrendingProjectsCarousel); // Pure Component

const styles = StyleSheet.create({
  container: { paddingVertical: 16 },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 16,
    marginBottom: 12,
    color: "#333",
  },
  listPadding: { paddingHorizontal: 16 },
  card: {
    width: CARD_WIDTH,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginRight: 16,
    elevation: 4, // Android shadow
    overflow: "hidden", // Important for border radius
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 150,
  },
  cardContent: { padding: 10 },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 4,
  },
  whatsappIcon: {
  width: 22,
  height: 22,
  },
  price: {
    color: "#e60023",
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 2,
  },
  location: {
    fontSize: 12,
    color: "#666",
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    flex: 2,
    paddingVertical: 8,
    borderRadius: 6,
    marginRight: 6,
    alignItems: "center",
  },
  iconButton: {
    flex: 0.6,
    paddingVertical: 8,
    borderRadius: 6,
    marginRight: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },

});