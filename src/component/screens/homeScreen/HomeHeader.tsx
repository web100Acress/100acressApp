import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const searchTexts = [
  "Search Sohna Road",
  "Search Golf Course Road",
  "Search Dwarka Expressway",
  "Search New Gurgaon",
  "Search Southern Peripheral Road",
  "Search Golf Course Extn Road",
  "Search NH-48",
];

const HomeHeader = () => {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // ⛔ stop animation when user types
    if (inputValue.length > 0) return;

    const currentText = searchTexts[textIndex];
    const speed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentText.length) {
        setDisplayText(currentText.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && charIndex > 0) {
        setDisplayText(currentText.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % searchTexts.length);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex, inputValue]);

  return (
    <>
      <Image
        source={{
          uri: "https://d16gdc5rm7f21b.cloudfront.net/uploads/1767509876741-oberoi-360-north-mobile.webp",
        }}
        style={styles.banner}
      />

      <View style={styles.searchContainer}>
        <TextInput
          value={inputValue}
          onChangeText={setInputValue}
          placeholder={displayText}
          placeholderTextColor="#6B7280"
          style={styles.searchInput}
          returnKeyType="search"
        />
      </View>
    </>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  banner: {
    width,
    height: 300,
    resizeMode: "cover",
  },
  searchContainer: {
    marginHorizontal: 16,
    marginTop: -20,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 14,
    height: 48,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#d4b6b6ff",
  },
  searchInput: {
    fontSize: 18,
    color: "#000",
  },
});
