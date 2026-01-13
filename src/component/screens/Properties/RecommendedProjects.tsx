import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Linking } from 'react-native';
import { getRecommendedProjects } from '../../../api/Services/recommendedApi';

interface RecommendedProject {
  icon: string;
  label: string;
  location: string;
  url: string;
}

const RecommendedProjects = () => {
  const [projects, setProjects] = useState<RecommendedProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getRecommendedProjects();
        setProjects(data);
      } catch (error) {
        console.log('API error:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading) {
    return <Text style={{ padding: 16 }}>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommended Projects</Text>
      <Text style={styles.subtitle}>
        Discover premium properties handpicked for luxury living and exceptional investment returns
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {projects.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => Linking.openURL(item.url)}
          >
            <View style={{ marginRight: 16, marginTop: 12 }}>
              <Image source={{ uri: item.icon }} style={styles.image} />
              <Text style={{ fontWeight: '600', marginTop: 8 }}>
                {item.label}
              </Text>
              <Text style={{ color: '#6B7280', marginTop: 4 }}>
                {item.location}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

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
