import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { fetchActiveBanners, pickBestBannerUrl } from "../../../api/bannerService";

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
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);

  useEffect(() => {
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
  }, [charIndex, isDeleting, textIndex]);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const banners = await fetchActiveBanners();
        console.log("HomeHeader: active banners fetched:", banners?.length || 0);
        const url = pickBestBannerUrl(banners[0]);
        console.log("HomeHeader: selected banner url:", url);
        if (isMounted) setBannerUrl(url);
      } catch {
        console.log("HomeHeader: failed to fetch banners, using fallback");
        if (isMounted) setBannerUrl(null);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {bannerUrl ? (
        <Image
          source={{
            uri: bannerUrl,
          }}
          style={styles.banner}
        />
      ) : null}

      <View style={styles.searchContainer}>
        <Text style={styles.searchAnimated}>{displayText}</Text>
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
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: -20,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
    borderColor: "#d4b6b6ff",
  },
  searchAnimated: {
    fontSize: 18,
    color: "#6B7280",
  },
});
