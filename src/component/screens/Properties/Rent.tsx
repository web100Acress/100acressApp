import React from 'react';
import { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity,TextInput } from 'react-native';
import { Linking } from "react-native";
import { search } from 'react-native-country-picker-modal/lib/CountryService';


const Buying = [
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

const Rent = () => {

  const [search, setSearch] = useState("");
  return (
    <ScrollView>
      <View style={styles.container}>
      <TextInput
        placeholder='Search Properties....'
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
        />
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      
        {Buying.map((item, index) => (
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

    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {Buying.map((item, index) => (
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

    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {Buying.map((item, index) => (
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
    </ScrollView><ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {Buying.map((item, index) => (
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
    </ScrollView>

  )
}

export default Rent;

const styles = StyleSheet.create({
    searchInput:{
      paddingHorizontal: 10,
      paddingVertical: 15,
      backgroundColor: '#ffffffff',
      borderRadius: 15,
      color: '#000000'
    },
    container:{
    padding:16,
    backgroundColor: "#f8efefff"
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
    width: 240,
    height: 140,
    borderRadius: 12,
    },
})
