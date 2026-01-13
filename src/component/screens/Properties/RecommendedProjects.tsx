import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Linking } from "react-native";
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchRecommendedProjects, Project } from '../../../redux/slice/projectSlice';

const RecommendedProjects = () => {
  const dispatch = useAppDispatch();
  const { recommended, loading, error } = useAppSelector((state) => state.project);

  useEffect(() => {
    dispatch(fetchRecommendedProjects());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Recommended Projects</Text>
        <Text style={styles.subtitle}>Discover premium properties handpicked for luxury living and exceptional investment returns</Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Recommended Projects</Text>
        <Text style={styles.subtitle}>Discover premium properties handpicked for luxury living and exceptional investment returns</Text>
        <Text style={{ color: 'red' }}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommended Projects</Text>
      <Text style={styles.subtitle}>Discover premium properties handpicked for luxury living and exceptional investment returns</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {recommended.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => Linking.openURL(`https://www.100acress.com/${item.project_url}`)}
          >
            <View style={{ marginRight: 16, marginTop: 12 }}>
              <Image source={{ uri: item.thumbnailImage }} style={styles.image} />
              <Text style={{ fontWeight: "600", marginTop: 8 }}>
                {item.projectName}
              </Text>
              <Text style={{ color: "#6B7280", marginTop: 4 }}>
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
  container: {
    padding: 16,
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
});
