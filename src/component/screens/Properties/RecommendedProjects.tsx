import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Linking } from "react-native";


const RecommendedProjectsImg = [
    { 
        icon:"https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/thumbnails/1763702902013-thumb.webp",
        label:"Smartworld GIC",
        location: "Sector M9, Manesar",
        url:"https://www.100acress.com/smart-world-gic/"
        
    },
    { 
        icon:"https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/thumbnails/1760767763798-banner.webp",
        label:"Signature Sarvam at DXP Estate",
        location: "Sector 37D, Dwarka Expressway",
        url:"https://www.100acress.com/signature-global-dxp-estate-37D/"
    },
    { 
        icon:"https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/thumbnails/1761736939709-banner.webp",
        label:"M3M Elie Saab at SCDA",
        location: "Sector 111, Dwarka Expressway",
        url:"https://www.100acress.com/m3m-eliesaab-residences/"
    },
    { 
        icon:"https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/thumbnails/1759123018502-thumb.webp",
        label:"SBPTP DownTown 66",
        location: "Sector 66, Golf Course Extn Road",
        url:"https://www.100acress.com/bptp-downtown-66/"
    },

]

const RecommendedProjects = () => {
  return (
    <View style={styles.container}>
    <Text style={styles.title}>Recommended Projects</Text>
    <Text style={styles.subtitle}>Discover premium properties handpicked for luxury living and exceptional investment returns</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {RecommendedProjectsImg.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => Linking.openURL(item.url)}
            >
            <View style={{ marginRight: 16, marginTop: 12 }}>
                <Image source={{ uri: item.icon }} style={styles.image} />
                <Text style={{ fontWeight: "600", marginTop: 8 }}>
                {item.label}
                </Text>
                <Text style={{ color: "#6B7280", marginTop: 4 }}>
                {item.location}
                </Text>
            </View>
            </TouchableOpacity>
        ))}
    </ScrollView>
    </View>

  )
}

export default RecommendedProjects;

const styles = StyleSheet.create({
    container:{
    padding:16,
    },
    title: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 12,
    },
    subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 10,
  },
    image: {
    width: 250,
    height: 140,
    borderRadius: 12,
    },
})
