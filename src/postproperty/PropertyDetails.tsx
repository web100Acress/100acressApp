import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

const PropertyDetails = () => {
  const navigation = useNavigation<any>();  
  
  const [size, setSize] = useState("");
  const [sizeUnit, setSizeUnit] = useState("Sqyd");

  const [price, setPrice] = useState("");
  const [priceUnit, setPriceUnit] = useState("Lakhs");

  const [furnishing, setFurnishing] = useState("");
  const [builtYear, setBuiltYear] = useState("");

  const [landmark, setLandmark] = useState("");
  const [amenities, setAmenities] = useState("");
  const [description, setDescription] = useState("");

  const CardTitle = ({ icon, title }: any) => (
    <View style={styles.cardHeader}>
      <View style={styles.iconBox}>
        <Text>{icon}</Text>
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
  );

  const Dropdown = ({ value, onChange, items }: any) => (
    <View style={styles.dropdownWrapper}>
      <Text style={styles.dropdownText}>{value || "Select"}</Text>
      <Picker
        selectedValue={value}
        onValueChange={onChange}
        style={styles.hiddenPicker}
      >
        {items.map((item: any) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.heading}>Tell Us About Your Property</Text>
      <Text style={styles.subHeading}>
        Accurate details attract right buyers
      </Text>

      {/* AREA DETAILS */}
      <View style={styles.card}>
        <CardTitle icon="📐" title="AREA DETAILS" />
        <Text style={styles.label}>PROPERTY SIZE</Text>

        <View style={styles.row}>
          <TextInput
            placeholder="Enter area"
            style={[styles.input, { flex: 2, marginRight: 10 }]}
            keyboardType="numeric"
            value={size}
            onChangeText={setSize}
          />

          <View style={{ flex: 1 }}>
            <Dropdown
              value={sizeUnit}
              onChange={setSizeUnit}
              items={[
                { label: "Sqft", value: "Sqft" },
                { label: "Sqyd", value: "Sqyd" },
              ]}
            />
          </View>
        </View>
      </View>

      {/* PRICE */}
      <View style={styles.card}>
        <CardTitle icon="💲" title="PRICE" />
        <Text style={styles.label}>EXPECTED PRICE</Text>

        <View style={styles.row}>
          <TextInput
            placeholder="Enter price"
            style={[styles.input, { flex: 2, marginRight: 10 }]}
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />

          <View style={{ flex: 1 }}>
            <Dropdown
              value={priceUnit}
              onChange={setPriceUnit}
              items={[
                { label: "Lakhs", value: "Lakhs" },
                { label: "Crores", value: "Crores" },
              ]}
            />
          </View>
        </View>
      </View>

      {/* FURNISHING & BUILT YEAR */}
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <CardTitle icon="🪑" title="FURNISHING" />
            <Dropdown
              value={furnishing}
              onChange={setFurnishing}
              items={[
                { label: "Select Furnishing", value: "" },
                { label: "Fully Furnished", value: "Fully Furnished" },
                { label: "Semi Furnished", value: "Semi Furnished" },
                { label: "Unfurnished", value: "Unfurnished" },
              ]}
            />
          </View>

          <View style={{ flex: 1 }}>
            <CardTitle icon="📅" title="BUILT YEAR" />
            <TextInput
              placeholder="e.g. 2015"
              style={styles.input}
              keyboardType="numeric"
              value={builtYear}
              onChangeText={setBuiltYear}
            />
          </View>
        </View>
      </View>

      {/* LANDMARK & AMENITIES */}
      <View style={styles.card}>
        <CardTitle icon="📍" title="LANDMARK / AREA" />
        <TextInput
          placeholder="Near Metro, Mall etc"
          style={styles.input}
          value={landmark}
          onChangeText={setLandmark}
        />

        <View style={{ marginTop: 16 }}>
          <CardTitle icon="🧩" title="AMENITIES" />
          <TextInput
            placeholder="Gym, Pool, Parking"
            style={styles.input}
            value={amenities}
            onChangeText={setAmenities}
          />
          <Text style={styles.helper}>Separate with commas</Text>
        </View>
      </View>

      {/* DESCRIPTION */}
      <View style={styles.card}>
        <CardTitle icon="📝" title="DESCRIPTION" />
        <TextInput
          placeholder="Describe your property..."
          style={styles.textArea}
          multiline
          value={description}
          onChangeText={setDescription}
        />
      </View>

      {/* Next Button */}
            <TouchableOpacity 
            style={styles.nextBtn} 
            onPress={() => navigation.navigate("UploadImage")}
            >
              <Text style={styles.nextText}>Next</Text>
            </TouchableOpacity>
    </ScrollView>
  );
};

export default PropertyDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
  },
  subHeading: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#eef1ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1f2937",
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6b7280",
    marginBottom: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    height: 46,
    borderWidth: 1,
    borderColor: "#c7cbd1",
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  dropdownWrapper: {
    borderWidth: 1,
    borderColor: "#c7cbd1",
    borderRadius: 10,
    height: 46,
    justifyContent: "center",
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  dropdownText: {
    fontSize: 14,
    color: "#333",
  },
  hiddenPicker: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0,
  },
  textArea: {
    height: 100,
    borderWidth: 1,
    borderColor: "#c7cbd1",
    borderRadius: 10,
    padding: 12,
    textAlignVertical: "top",
    backgroundColor: "#fff",
  },
  helper: {
    fontSize: 11,
    color: "#6b7280",
    marginTop: 6,
  },
  nextBtn: {
    backgroundColor: '#e51e1e',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
});
