import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Pressable,
  Alert
} from "react-native";
import { Linking } from "react-native";

const handleCall = () => {
  const phoneNumber = "tel:+91 8500900100"; 

  Linking.openURL(phoneNumber).catch(() => {
    Alert.alert("Error", "Unable to open dialer");
  });
};


const projects = [
  {
    id: "bptp-downtown-66",
    image:
      "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/thumbnails/1759123018502-thumb.webp",
    title: "BPTP Downtown 66",
    price: "₹ 5.25 - 6.09 Cr",
    location: "Sector 66, Golf Course Extn Road, Gurugram",
    url: "https://www.100acress.com/bptp-downtown-66/",
  },
  {
    id: "signature-sarvam-dxp",
    image:
      "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/thumbnails/1760767763798-banner.webp",
    title: "Signature Sarvam at DXP Estate",
    price: "₹ 2.9 - 3.92 Cr",
    location: "Sector 37D, Dwarka Expressway, Gurugram",
    url: "https://www.100acress.com/signature-global-dxp-estate-37D/",
  },
  {
    id: "shapoorji-dualis",
    image:
      "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/uploads/1741245723440-thumbnail.jpg",
    title: "Shapoorji Pallonji Dualis",
    price: "₹ 6.85 - 9.02 Cr",
    location: "Sector 46, Near Huda Metro, Gurugram",
    url: "https://www.100acress.com/shapoorji-pallonji-the-dualis/",
  },
  {
    id: "whiteland-westin",
    image:
      "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/thumbnails/1740914739115-100acre/project/jsizvagx0iqtuqwdwlsd",
    title: "Whiteland Westin Residences",
    price: "₹ 6.68 - 11.25 Cr",
    location: "Sector 103, Dwarka Expressway, Gurugram",
    url: "https://www.100acress.com/whiteland-westin-residences/",
  },
];


const TrendingProjects = () => {
  return (
    <View>
      <Text style={styles.sectionTitle}>Trending Projects</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {projects.map((item) => (
          <Pressable
            key={item.id}
            style={styles.card}
          >
            {/* Image */}
            <View>
              <Image source={{ uri: item.image }} style={styles.image} />

              {/* RERA Badge */}
              {/* <View style={styles.reraBadge}>
                <Text style={styles.reraText}>✓ RERA</Text>
              </View> */}

              {/* Wishlist */}
              <Text style={styles.heart}>♡</Text>
            </View>

            {/* Details */}
            <View style={styles.details}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>{item.price}</Text>
              <Text style={styles.location}>{item.location}</Text>
            </View>

            {/* Actions */}
            <View style={styles.actions}>
              <Pressable 
                style={styles.exploreBtn}
                onPress={() => Linking.openURL(item.url)}>
                <Text style={styles.exploreText}>Explore</Text>
              </Pressable>

              <Pressable onPress={handleCall} style={styles.iconBtn}>
                <Text>📞</Text>
              </Pressable>

              <Pressable style={styles.iconBtn}>
                <Text>💬</Text>
              </Pressable>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {projects.map((item) => (
          <Pressable
            key={item.id}
            style={styles.card}
            onPress={() => Linking.openURL(item.url)}
          >
            {/* Image */}
            <View>
              <Image source={{ uri: item.image }} style={styles.image} />

              {/* RERA Badge */}
              {/* <View style={styles.reraBadge}>
                <Text style={styles.reraText}>✓ RERA</Text>
              </View> */}

              {/* Wishlist */}
              {/* <Text style={styles.heart}>♡</Text> */}
            </View>

            {/* Details */}
            <View style={styles.details}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>{item.price}</Text>
              <Text style={styles.location}>{item.location}</Text>
            </View>

            {/* Actions */}
            <View style={styles.actions}>
              <Pressable style={styles.exploreBtn}>
                <Text style={styles.exploreText}>Explore</Text>
              </Pressable>

              <Pressable style={styles.iconBtn}>
                <Text>📞</Text>
              </Pressable>

              <Pressable style={styles.iconBtn}>
                <Text>💬</Text>
              </Pressable>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default TrendingProjects;
const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginHorizontal: 16,
    marginTop: 24,
  },
  row: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginRight: 16,
    paddingBottom: 12,
  },
  image: {
    width: "100%",
    height: 160,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
//   reraBadge: {
//     position: "absolute",
//     top: 10,
//     left: 10,
//     backgroundColor: "#fff",
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 12,
//   },
//   reraText: {
//     fontSize: 10,
//     fontWeight: "600",
//   },
  heart: {
    position: "absolute",
    top: 10,
    right: 10,
    fontSize: 18,
  },
  details: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
  },
  price: {
    color: "#E11D48",
    fontWeight: "600",
    marginTop: 4,
  },
  location: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginTop: 8,
  },
  exploreBtn: {
    flex: 1,
    backgroundColor: "#EF4444",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 8,
  },
  exploreText: {
    color: "#fff",
    fontWeight: "600",
  },
  iconBtn: {
    width: 80,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
    backgroundColor: "#ffe5e5ff",
  },
});


// ritika mitika