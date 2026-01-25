import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import {
  launchImageLibrary,
  ImageLibraryOptions,
  Asset,
} from "react-native-image-picker";
import { useNavigation } from "@react-navigation/native";

const PropertyImages = () => {
  const navigation = useNavigation<any>();
  const [frontImage, setFrontImage] = useState<Asset | null>(null);
  const [additionalImages, setAdditionalImages] = useState<Asset[]>([]);

  const pickFrontImage = () => {
    const options: ImageLibraryOptions = {
      mediaType: "photo",
      quality: 0.8,
      selectionLimit: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel || response.errorCode) return;
      if (response.assets && response.assets.length > 0) {
        setFrontImage(response.assets[0]);
      }
    });
  };

  const pickAdditionalImages = () => {
    const options: ImageLibraryOptions = {
      mediaType: "photo",
      quality: 0.8,
      selectionLimit: 4,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel || response.errorCode) return;
      if (response.assets) {
        setAdditionalImages(response.assets);
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>📸 Let’s see your property</Text>
      <Text style={styles.subHeading}>
        High-quality images attract the right buyers
      </Text>

      {/* FRONT IMAGE */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>FRONT IMAGE</Text>

        <TouchableOpacity style={styles.uploadBtn} onPress={pickFrontImage}>
          <Text style={styles.chooseBtn}>Choose file</Text>
          <Text style={styles.fileText}>
            {frontImage ? "1 file selected" : "No file chosen"}
          </Text>
        </TouchableOpacity>

        {frontImage && (
          <Image
            source={{ uri: frontImage.uri }}
            style={styles.preview}
          />
        )}
      </View>

      {/* ADDITIONAL IMAGES */}
      <View style={styles.card}>
        <View style={styles.rowBetween}>
          <Text style={styles.cardTitle}>ADDITIONAL IMAGES</Text>
          <Text style={styles.recommended}>(3–4 recommended)</Text>
        </View>

        <TouchableOpacity
          style={styles.uploadBtn}
          onPress={pickAdditionalImages}
        >
          <Text style={styles.chooseBtn}>Choose files</Text>
          <Text style={styles.fileText}>
            {additionalImages.length > 0
              ? `${additionalImages.length} files selected`
              : "No file chosen"}
          </Text>
        </TouchableOpacity>

        <View style={styles.imageRow}>
          {additionalImages.map((img, index) => (
            <Image
              key={index}
              source={{ uri: img.uri }}
              style={styles.thumb}
            />
          ))}
        </View>
      </View>

      {/* SUBMIT */}
      <TouchableOpacity style={styles.submitBtn} onPress={() => navigation.navigate("UploadImage")}>
        <Text style={styles.submitText}>Submit →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PropertyImages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: "700",
  },
  subHeading: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 10,
  },
  uploadBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 10,
    padding: 12,
  },
  chooseBtn: {
    backgroundColor: "#111827",
    color: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginRight: 12,
    fontSize: 13,
  },
  fileText: {
    fontSize: 13,
    color: "#374151",
  },
  preview: {
    height: 160,
    borderRadius: 10,
    marginTop: 12,
  },
  imageRow: {
    flexDirection: "row",
    marginTop: 12,
    flexWrap: "wrap",
  },
  thumb: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  recommended: {
    fontSize: 12,
    color: "#6b7280",
  },
  submitBtn: {
    backgroundColor: "#e51e1e",
    padding: 14,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 40,
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
