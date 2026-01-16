import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.7; // Width of each card

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

// Static project data
const trendingProjects: Project[] = [
  {
    id: 1,
    title: "M3M Jacob Co Residences",
    location: "Sector 97, Noida Expressway",
    price: "₹7.5 - 20.48 Cr",
    image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/thumbnails/1759662121452-main.webp",
    url: "https://www.100acress.com/jacob-m3m-sector-97-noida/",
    phone: "+918500900100",
    whatsapp: "+918500900100",
  },
  {
    id: 2,
    title: "Experion The Trillion",
    location: "Sector 48, Sohna Road",
    price: "₹5.83 - 7.38 Cr",
    image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/thumbnails/1740914900042-100acre/project/loedvckg91xfhdnqulho",
    url: "https://www.100acress.com/experion-the-trillion/",
    phone: "+918500900101",
    whatsapp: "+918500900101",
  },
  {
    id: 3,
    title: "Elan The Statement",
    location: "Sector 49, Sohna Road",
    price: "₹11.06 - 16.51 Cr",
    image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/thumbnails/1757160649408-3d-render-gift-box-with-ribbon-present-package.jpg", // Replace with actual image
    url: "https://www.100acress.com/elan-the-statement/",
    phone: "+918500900102",
    whatsapp: "+918500900102",
  },
  {
    id: 4,
    title: "Signature Sarvam at DXP Estate",
    location: "Sector 37D, Dwarka Expressway",
    price: "₹2.9 - 3.92 Cr",
    image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/thumbnails/1760767763798-banner.webp",
    url: "https://www.100acress.com/signature-global-dxp-estate-37D/",
    phone: "+918500900103",
    whatsapp: "+918500900103",
  },
];

const TrendingProjectsCarousel: React.FC = () => {
  const handleOpenURL = (url: string) => {
    Linking.openURL(url).catch(() => Alert.alert("Error", "Unable to open URL"));
  };

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`).catch(() => Alert.alert("Error", "Unable to call"));
  };

  const handleWhatsApp = (number: string) => {
    const url = `https://wa.me/${number.replace(/[^0-9]/g, "")}`;
    Linking.openURL(url).catch(() => Alert.alert("Error", "Unable to open WhatsApp"));
  };

  return (
    <View style={{ paddingVertical: 16 }}>
      <Text style={styles.heading}>Trending Projects</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {trendingProjects.map((project) => (
          <View key={project.id} style={styles.card}>
            <Image source={{ uri: project.image }} style={styles.image} />
            <View style={{ padding: 8 }}>
              <Text style={styles.title}>{project.title}</Text>
              <Text style={styles.price}>{project.price}</Text>
              <Text style={styles.location}>{project.location}</Text>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "#e60023" }]}
                  onPress={() => handleOpenURL(project.url)}
                >
                  <Text style={styles.buttonText}>Explore</Text>
                </TouchableOpacity>
                {project.phone && (
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#f6d0d0" }]}
                    onPress={() => handleCall(project.phone!)}
                  >
                    <Text style={styles.buttonText}>📞</Text>
                  </TouchableOpacity>
                )}
                {project.whatsapp && (
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#b2fcce" }]}
                    onPress={() => handleWhatsApp(project.whatsapp!)}
                  >
                    <Text style={styles.buttonText}>💬</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default TrendingProjectsCarousel;

const styles = StyleSheet.create({
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 16,
    marginBottom: 12,
  },
  card: {
    width: CARD_WIDTH,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginRight: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 180,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  price: {
    color: "#e60023",
    fontWeight: "bold",
    marginBottom: 2,
  },
  location: {
    fontSize: 12,
    color: "#555",
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
