import React, { memo, useRef, useState } from "react";
import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  ViewToken,
  StatusBar,
  TouchableWithoutFeedback,
  Text,
} from "react-native";
import { WebView } from "react-native-webview";

const { width, height } = Dimensions.get("window");
// Agar Bottom Tabs hain toh height - 70-80 use karein
const SCREEN_HEIGHT = height; 
const SCREEN_WIDTH = width;

const SHORTS = [
  "https://www.youtube.com/shorts/mEdrmKXiEbE",
  "https://www.youtube.com/shorts/hTeR3J0ME6U",


];

const extractYoutubeId = (url: string) => {
  const regex = /shorts\/([^/?]+)/;
  const match = url.match(regex);
  return match ? match[1] : "";
};

const getYoutubeHtml = (id: string, isVisible: boolean, isMuted: boolean) => `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <style>
    html, body { 
      margin: 0; padding: 0; height: 100%; width: 100%; 
      background: black; overflow: hidden; 
      display: flex; justify-content: center; align-items: center;
    }
    .video-container {
      position: relative;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
    }
    iframe {
      position: absolute;
      top: 50%;
      left: 50%;
      /* Scale 1.8 se 2.0 tak width ke hisaab se adjust hota hai */
      transform: translate(-50%, -50%) scale(1.8); 
      width: 100vw;
      height: 100vh;
      border: none;
    }
  </style>
</head>
<body>
  <div class="video-container">
    <iframe
      src="https://www.youtube.com/embed/${id}?autoplay=${isVisible ? 1 : 0}&mute=${isMuted ? 1 : 0}&controls=0&loop=1&playlist=${id}&playsinline=1&rel=0&enablejsapi=1"
      allow="autoplay; encrypted-media"
    ></iframe>
  </div>
</body>
</html>
`;

const YouTubeReels = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isGlobalMuted, setIsGlobalMuted] = useState(true);
  const [hasUnmutedOnce, setHasUnmutedOnce] = useState(false);

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index ?? 0);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 80,
  }).current;

  const handlePress = () => {
    setIsGlobalMuted(!isGlobalMuted);
    if (isGlobalMuted) {
      setHasUnmutedOnce(true); // 🔥 Hint sirf pehli baar dikhegi
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <FlatList
        data={SHORTS}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item}
        // Performance optimization for scrolling
        getItemLayout={(_, index) => ({
          length: SCREEN_HEIGHT,
          offset: SCREEN_HEIGHT * index,
          index,
        })}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        renderItem={({ item, index }) => {
          const videoId = extractYoutubeId(item);
          const isVisible = index === activeIndex;

          return (
            <TouchableWithoutFeedback onPress={handlePress}>
              <View style={styles.videoCard}>
                {/* Sirf current, pichli aur agli video render hogi memory bachane ke liye */}
                {Math.abs(index - activeIndex) <= 1 ? (
                  <WebView
                    key={`reel-${videoId}-${isGlobalMuted}`} 
                    source={{
                      html: getYoutubeHtml(videoId, isVisible, isGlobalMuted),
                      baseUrl: "https://m.youtube.com", // 🔥 Fixes Error 153
                    }}
                    style={styles.webview}
                    javaScriptEnabled
                    domStorageEnabled
                    allowsInlineMediaPlayback
                    mediaPlaybackRequiresUserAction={false}
                    scrollEnabled={false}
                    scalesPageToFit={true}
                  />
                ) : (
                  <View style={{ flex: 1, backgroundColor: 'black' }} />
                )}

                {/* Hint logic: Unmute hone par gayab ho jayegi */}
                {isGlobalMuted && !hasUnmutedOnce && isVisible && (
                  <View style={styles.tapHint}>
                    <Text style={styles.tapText}>🔊 Tap for sound</Text>
                  </View>
                )}
              </View>
            </TouchableWithoutFeedback>
          );
        }}
      />
    </View>
  );
};

export default memo(YouTubeReels);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  videoCard: {
    // width: width,
    // height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: "#000",
  },
  webview: {
    flex: 1,
    backgroundColor: "black",
  },
  tapHint: {
    position: "absolute",
    bottom: 100,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  tapText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});