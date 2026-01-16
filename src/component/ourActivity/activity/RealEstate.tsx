import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Pressable } from 'react-native'

const serviceInfo = [
    {
       icon: "https://www.100acress.com/icons/discussion.png",
       title: "Real Estate Consulting",
       para: "Get expert real estate consulting to find the right property, whether it's flats, apartments, or new residential projects."
    },
    {
       icon: "https://www.100acress.com/icons/male-student.webp",
       title: "Real Estate Consulting",
       para: "Get expert real estate consulting to find the right property, whether it's flats, apartments, or new residential projects."
    },
    {
       icon: "https://www.100acress.com/icons/interior.webp",
       title: "Real Estate Consulting",
       para: "Get expert real estate consulting to find the right property, whether it's flats, apartments, or new residential projects."
    },
]

const RealEstate = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.heading}>Comprehensive Real Estate Solution</Text>
        <Text style={styles.para}>From consultation to construction, we provide end-to-end services to make your property dreams a reality</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
            {serviceInfo.map((item, index) => (
                <View style={styles.card} key={index}>
                {/* Image */}
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
  )
}

export default RealEstate

const styles = StyleSheet.create({
  container: {
    marginTop: 45,
    padding: 16,
  },

  heading: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "600",
    color: "#df2525",
  },

  para: {
    textAlign: "center",
    paddingVertical: 12,
    color: "#000",
    fontSize: 15,
    fontWeight: "500",
  },

  card: {
    flexDirection: "row",          // 🔥 MAIN CHANGE
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fcf1f1",
    padding: 15,
    marginVertical: 6,
    borderRadius: 12,
    backgroundColor: "#fcf1f1",
  },

  imgSection: {
    height: 52,
    width: 52,
    borderRadius: 26,
    backgroundColor: "#b43838",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
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
    fontWeight: "600",
    color: "#111",
    marginBottom: 4,
  },

  cardPara: {
    fontSize: 13,
    color: "#555",
    lineHeight: 18,
  },
});
