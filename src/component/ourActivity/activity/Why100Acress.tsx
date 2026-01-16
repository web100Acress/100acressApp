import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";

const stats = [
  { icon: "🏠", value: 1600, label: "Residential Projects" },
  { icon: "🏢", value: 900, label: "Commercial Projects" },
  { icon: "📍", value: 90, label: "SCO Plots" },
  { icon: "📐", value: 400, label: "Plots & Floors" },
  { icon: "🌐", value: 245000, label: "Monthly Visitors" }, // 2.45L+
  { icon: "🏆", value: 1000, label: "Awards" },
];

const Why100Acress = () => {
  const [counters, setCounters] = useState(stats.map(() => 0));

  useEffect(() => {
    const interval = setInterval(() => {
      setCounters((prev) =>
        prev.map((val, i) => {
          const target = stats[i].value;
          if (val < target) {
            // increment speed
            const increment = Math.ceil(target / 50);
            return Math.min(val + increment, target);
          }
          return val;
        })
      );
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // Helper to format large numbers like 245000 -> 2.45L+
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
            Why Choose 100acress.com for Real Estate in Gurgaon & Delhi NCR?
            100acress is transforming property buying, selling, and renting
            by offering verified properties listings.
          </Text>
          <Text style={styles.description}>
            With a huge database of residential and commercial projects,
            the platform ensures trusted builders, genuine deals, and expert
            guidance every step of the way.
          </Text>
          <Text style={styles.founder}>Rajesh Aggarwal</Text>
          <Text style={styles.role}>Founder & CEO</Text>
        </View>

        {/* RIGHT GRID */}
        <View style={styles.right}>
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
                <Text style={styles.value}>{formatNumber(counters[index])}</Text>
                <Text style={styles.label}>{item.label}</Text>
              </View>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Why100Acress;

const styles = StyleSheet.create({
  container: { padding: 20 },
  left: { marginBottom: 24 },
  heading: { fontSize: 26, fontWeight: "700", marginBottom: 12, color: "#df2525" },
  description: { paddingVertical: 12, color: "#000", fontSize: 15, fontWeight: "500" },
  founder: { marginTop: 20, fontSize: 16, fontWeight: "700" },
  role: { fontSize: 13, color: "#000000" },
  right: {},
  row: { justifyContent: "space-between" },
  card: {
    width: "48%",
    backgroundColor: "#fcf1f1",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: { fontSize: 22 },
  value: { fontSize: 22, fontWeight: "800", marginBottom: 4 },
  label: { fontSize: 13, color: "#6B7280", textAlign: "center" },
});
