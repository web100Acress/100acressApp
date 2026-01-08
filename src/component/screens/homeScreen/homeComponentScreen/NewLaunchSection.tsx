import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const PROJECT_DATA = [
  {
    tag: '★ New launch ★',
    image:
      'https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/thumbnails/1759123018502-thumb.webp',
    name: 'SB Urban Park',
    location: 'Manyata Tech Park, Thanisandra',
    price: '₹1.97 - 3.7 Cr',
    type: '3, 4 BHK Apartments',
    growth: '↑ 31.5% (1Y) in Manyata Tech',
    buttonText: 'View number',
  },
  {
    tag: '★ New launch ★',
    image:
      'https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/thumbnails/1759123018502-thumb.webp',
    name: 'SB Urban Park',
    location: 'Manyata Tech Park, Thanisandra',
    price: '₹1.97 - 3.7 Cr',
    type: '3, 4 BHK Apartments',
    growth: '↑ 31.5% (1Y) in Manyata Tech',
    buttonText: 'View number',
  },
  {
    tag: '★ New launch ★',
    image:
      'https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/thumbnails/1759123018502-thumb.webp',
    name: 'SB Urban Park',
    location: 'Manyata Tech Park, Thanisandra',
    price: '₹1.97 - 3.7 Cr',
    type: '3, 4 BHK Apartments',
    growth: '↑ 31.5% (1Y) in Manyata Tech',
    buttonText: 'View number',
  },
];

const NewLaunchSection = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Newly launched projects</Text>
      </View>

      <Text style={styles.subtitle}>
        Best prices • Unit of choice • Easy payment plan
      </Text>

      {/* Horizontal Scroll */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {PROJECT_DATA.map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.newLaunchTag}>
              <Text style={styles.newLaunchText}>{item.tag}</Text>
            </View>

            <View style={styles.row}>
              <Image source={{ uri: item.image }} style={styles.image} />

              <View style={styles.details}>
                <Text style={styles.projectName}>{item.name}</Text>
                <Text style={styles.location}>{item.location}</Text>
                <Text style={styles.price}>{item.price}</Text>
                <Text style={styles.type}>{item.type}</Text>
                <Text style={styles.growth}>{item.growth}</Text>

                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>{item.buttonText}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  subtitle: {
    color: '#666',
    marginBottom: 12,
  },

  card: {
    width: 320,
    marginRight: 12,
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  newLaunchTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFF3E0',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 6,
  },
  newLaunchText: {
    color: '#F57C00',
    fontWeight: '600',
    fontSize: 12,
  },

  row: {
    flexDirection: 'row',
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  projectName: {
    fontWeight: '700',
    fontSize: 16,
    color: '#222',
  },
  location: {
    color: '#555',
    fontSize: 13,
  },
  price: {
    fontWeight: '600',
    fontSize: 14,
    marginTop: 2,
  },
  type: {
    color: '#777',
    fontSize: 13,
  },
  growth: {
    color: 'green',
    marginTop: 4,
  },

  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default NewLaunchSection;
