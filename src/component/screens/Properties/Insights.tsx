import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import {
  fetchActiveBanners,
  pickBestBannerUrl,
} from "../../../api/Services/bannerService";

const { width } = Dimensions.get("window");

const LOGO_URL =
  "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/logowhite.webp.webp";

const searchTexts = [
  "Search Sohna Road",
  "Search Golf Course Road",
  "Search Dwarka Expressway",
  "Search New Gurgaon",
  "Search Southern Peripheral Road",
  "Search Golf Course Extn Road",
  "Search NH-48",
];

const Insights = () => {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [bannerUrls, setBannerUrls] = useState<string[]>([]);
  const [bannerIndex, setBannerIndex] = useState(0);

  // Typing animation
  useEffect(() => {
    if (inputValue.length > 0) return;

    const currentText = searchTexts[textIndex];
    const speed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentText.length) {
        setDisplayText(currentText.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && charIndex > 0) {
        setDisplayText(currentText.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % searchTexts.length);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex, inputValue]);

  // Fetch banners
  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const banners = await fetchActiveBanners();
        const urls = banners
          .map((banner) => pickBestBannerUrl(banner))
          .filter(Boolean) as string[];

        if (isMounted) setBannerUrls(urls);
      } catch {
        if (isMounted) setBannerUrls([]);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  // Auto banner change
  useEffect(() => {
    if (bannerUrls.length === 0) return;

    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % bannerUrls.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [bannerUrls]);

  return (
    <>
      {bannerUrls.length > 0 && (
        <View style={styles.bannerWrapper}>
          <Image
            source={{ uri: bannerUrls[bannerIndex] }}
            style={styles.banner}
          />

          {/* LOGO */}
          <Image source={{ uri: LOGO_URL }} style={styles.logo} />
        </View>
      )}

      {/* SEARCH BOX */}
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

export default Insights;

const styles = StyleSheet.create({
  bannerWrapper: {
    width,
    height: 300,
  },
  banner: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  logo: {
    position: "absolute",
    top: 16,
    left: 16,
    width: 120,
    height: 40,
    resizeMode: "contain",
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
