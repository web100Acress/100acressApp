import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { fetchActiveBanners, pickBestBannerUrl } from "../../../api/Services/bannerService"; 

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
  const [bannerUrls, setBannerUrls] = useState<string[]>([]);
  const [bannerIndex, setBannerIndex] = useState(0);

  // Typing effect for search placeholder
  useEffect(() => {
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

  // Fetch banners from API
  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const banners = await fetchActiveBanners();
        console.log("HomeHeader: active banners fetched:", banners?.length || 0);
        const urls = banners.map((banner) => pickBestBannerUrl(banner)).filter(Boolean) as string[];
        if (isMounted) setBannerUrls(urls);
      } catch {
        console.log("HomeHeader: failed to fetch banners");
        if (isMounted) setBannerUrls([]);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  // Auto-scroll banners
  useEffect(() => {
    if (bannerUrls.length === 0) return;

    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % bannerUrls.length);
    }, 3000); // change banner every 3 seconds

    return () => clearInterval(interval);
  }, [bannerUrls]);

  return (
    <>
      {bannerUrls.length > 0 && (
        <Image
          source={{ uri: bannerUrls[bannerIndex] }}
          style={styles.banner}
        />
      )}

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
