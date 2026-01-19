import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";

const serviceInfo = [
  {
    icon: "https://www.100acress.com/icons/discussion.png",
    title: "Real Estate Consulting",
    para:
      "Get expert real estate consulting to find the right property, whether it's flats, apartments, or new residential projects.",
  },
  {
    icon: "https://www.100acress.com/icons/male-student.webp",
    title: "Property Investment",
    para:
      "Smart investment solutions with high ROI properties backed by market research and trusted developers.",
  },
  {
    icon: "https://www.100acress.com/icons/interior.webp",
    title: "Interior & Construction",
    para:
      "End-to-end interior design and construction services tailored to your taste and lifestyle.",
  },
];

const RealEstate = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Comprehensive Real Estate Solutions</Text>
      <Text style={styles.para}>
        From consultation to construction, we provide end-to-end services to make
        your property dreams a reality.
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {serviceInfo.map((item, index) => (
          <View style={styles.card} key={index}>
            {/* Icon */}
            <View style={styles.imgSection}>
              <Image source={{ uri: item.icon }} style={styles.img} />
            </View>

            {/* Content */}
            <View style={styles.contentSection}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardPara}>{item.para}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default RealEstate;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    paddingHorizontal: 16,
  },

  heading: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "800",
    color: "#df2525",
  },

  para: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
    color: "#4B5563",
    fontSize: 15,
    lineHeight: 22,
  },

  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginVertical: 8,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  imgSection: {
    height: 54,
    width: 54,
    borderRadius: 27,
    backgroundColor: "#c52828",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  img: {
    height: 26,
    width: 26,
    resizeMode: "contain",
  },

  contentSection: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },

  cardPara: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 19,
  },
});
