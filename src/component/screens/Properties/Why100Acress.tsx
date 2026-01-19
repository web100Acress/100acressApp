import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";

const stats = [
  { icon: "🏠", value: 1600, label: "Residential Projects" },
  { icon: "🏢", value: 900, label: "Commercial Projects" },
  { icon: "📍", value: 90, label: "SCO Plots" },
  { icon: "📐", value: 400, label: "Plots & Floors" },
  { icon: "🌐", value: 245000, label: "Monthly Visitors" },
  { icon: "🏆", value: 1000, label: "Awards" },
];

const Why100Acress = () => {
  const [counters, setCounters] = useState(stats.map(() => 0));

  useEffect(() => {
    const interval = setInterval(() => {
      setCounters((prev) =>
        prev.map((val, i) => {
          const target = stats[i].value;
          const increment = Math.ceil(target / 150);
          return val < target ? Math.min(val + increment, target) : val;
        })
      );
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 100000) return (num / 100000).toFixed(2) + "L+";
    if (num >= 1000) return (num / 1000).toFixed(0) + "K+";
    return num.toString();
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* LEFT CONTENT */}
        <View style={styles.left}>
          <Text style={styles.heading}>Why 100acress.com?</Text>

          <Text style={styles.description}>
            100acress is transforming property buying, selling, and renting by
            offering verified property listings and expert consultation.
          </Text>

          <Text style={styles.description}>
            With a vast database of residential and commercial projects, we
            ensure trusted builders, genuine deals, and complete transparency.
          </Text>

          <Text style={styles.founder}>Rajesh Aggarwal</Text>
          <Text style={styles.role}>Founder & CEO</Text>
        </View>

        {/* RIGHT GRID */}
        <FlatList
          data={stats}
          numColumns={2}
          scrollEnabled={false}
          keyExtractor={(_, i) => i.toString()}
          columnWrapperStyle={styles.row}
          renderItem={({ item, index }) => (
            <View style={styles.card}>
              <View style={styles.iconCircle}>
                <Text style={styles.icon}>{item.icon}</Text>
              </View>

              <Text style={styles.value}>
                {formatNumber(counters[index])}
              </Text>

              <Text style={styles.label}>{item.label}</Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default Why100Acress;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  left: {
    marginBottom: 28,
  },

  heading: {
    fontSize: 26,
    fontWeight: "800",
    color: "#df2525",
    marginBottom: 14,
  },

  description: {
    fontSize: 15,
    color: "#4B5563",
    lineHeight: 22,
    marginBottom: 10,
  },

  founder: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  role: {
    fontSize: 13,
    color: "#6B7280",
  },

  row: {
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 12,
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#FEE2E2",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  icon: {
    fontSize: 22,
  },

  value: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 4,
  },

  label: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 18,
  },
});
