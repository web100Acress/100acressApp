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
const CARD_WIDTH = width * 0.72;

type Project = {
  id: number;
  title: string;
  location: string;
  price: string;
  image: string;
  url: string;
  whatsapp?: string;
};

const BestBudgetProject: Project[] = [
  {
    id: 1,
    title: "M3M Antalya Hills",
    location: "Sector 79, Southern Peripheral Road",
    price: "₹1.68 - 2.46 Cr",
    image:
      "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/thumbnails/1740914828774-100acre/project/axam5uv3telszz9uyaqa",
    url: "https://www.100acress.com/m3m-antalya-hills/",
    whatsapp: "+918500900100",
  },
  {
    id: 2,
    title: "Signature Global City 81",
    location: "Sector 81, Dwarka Expressway",
    price: "₹1.65 - 1.83 Cr",
    image:
      "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/thumbnails/1740914839138-100acre/project/aglu41yl0ikr7eekxubi",
    url: "https://www.100acress.com/signature-global-city-81/",
    whatsapp: "+918500900101",
  },
  {
    id: 3,
    title: "M3M Soulitude",
    location: "Sector 89, New Gurgaon",
    price: "₹1.44 - 1.8 Cr",
    image:
      "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/thumbnails/1740914839138-100acre/project/aglu41yl0ikr7eekxubi",
    url: "https://www.100acress.com/m3m-soulitude/",
    whatsapp: "+918500900102",
  },
  {
    id: 4,
    title: "ROF Pravasa",
    location: "Sector 88A, Dwarka Expressway",
    price: "₹2.4 - 2.6 Cr",
    image:
      "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/thumbnails/1740914839138-100acre/project/aglu41yl0ikr7eekxubi",
    url: "https://www.100acress.com/rof-pravasa/",
    whatsapp: "+918500900103",
  },
];

const BestBudgetCarousel: React.FC = () => {
  const openURL = (url: string) => {
    Linking.openURL(url).catch(() =>
      Alert.alert("Error", "Unable to open link")
    );
  };

  const openWhatsApp = (number: string) => {
    const url = `https://wa.me/${number.replace(/[^0-9]/g, "")}`;
    Linking.openURL(url).catch(() =>
      Alert.alert("Error", "WhatsApp not available")
    );
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.heading}>Best Budget Projects in Gurgaon</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        snapToInterval={CARD_WIDTH + 16}
        decelerationRate="fast"
      >
        {BestBudgetProject.map((project) => (
          <View key={project.id} style={styles.card}>
            {/* Image */}
            <View style={styles.imageWrapper}>
              <Image source={{ uri: project.image }} style={styles.image} />

              {/* Price Badge */}
              <View style={styles.priceBadge}>
                <Text style={styles.priceText}>{project.price}</Text>
              </View>
            </View>

            {/* Content */}
            <View style={styles.content}>
              <Text style={styles.title} numberOfLines={1}>
                {project.title}
              </Text>

              <Text style={styles.location} numberOfLines={2}>
                📍 {project.location}
              </Text>

              {/* Buttons */}
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.exploreBtn}
                  onPress={() => openURL(project.url)}
                >
                  <Text style={styles.exploreText}>Explore</Text>
                </TouchableOpacity>

                {project.whatsapp && (
                  <TouchableOpacity
                    style={styles.whatsappBtn}
                    onPress={() => openWhatsApp(project.whatsapp!)}
                  >
                    <Text style={styles.whatsappText}>💬</Text>
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

export default BestBudgetCarousel;

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    marginLeft: 16,
    marginBottom: 12,
  },
  scrollContainer: {
    paddingHorizontal: 16,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginRight: 16,
    overflow: "hidden",
  },
  imageWrapper: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 190,
  },
  priceBadge: {
    position: "absolute",
    bottom: 8,
    left: 8,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  priceText: {
    color: "#e60023",
    fontWeight: "700",
    fontSize: 12,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  location: {
    fontSize: 13,
    color: "#666",
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  exploreBtn: {
    flex: 1,
    backgroundColor: "#e60023",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 8,
  },
  exploreText: {
    color: "#fff",
    fontWeight: "700",
  },
  whatsappBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#e9fff1",
    alignItems: "center",
    justifyContent: "center",
  },
  whatsappText: {
    fontSize: 20,
  },
});
