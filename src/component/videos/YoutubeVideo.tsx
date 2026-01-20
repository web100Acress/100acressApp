import React, { memo, useState, useRef } from "react";
import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  ViewToken,
  StatusBar,
} from "react-native";
import { WebView } from "react-native-webview";

const { width, height } = Dimensions.get("window");

// Poori screen cover karne ke liye heights
const SCREEN_HEIGHT = height; 

const SHORTS = [
  "https://www.youtube.com/shorts/mEdrmKXiEbE",
  "https://www.youtube.com/shorts/wxZ1jk0nxgu",
  "https://www.youtube.com/shorts/BVpqd4YPrso",
  "https://www.youtube.com/shorts/hTeR3J0ME6U",
];

const extractYoutubeId = (url: string) => {
  const regex = /shorts\/([^/?]+)/;
  const match = url.match(regex);
  return match ? match[1] : "";
};

const getYoutubeHtml = (id: string, isVisible: boolean) => `
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      html, body { margin: 0; padding: 0; height: 100%; background: black; overflow: hidden; }
      .container { position: relative; width: 100vw; height: 100vh; }
      iframe { pointer-events: none; } /* User touch prevent karne ke liye if needed */
    </style>
  </head>
  <body>
    <div class="container">
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/${id}?autoplay=${isVisible ? 1 : 0}&mute=0&controls=0&loop=1&playlist=${id}&modestbranding=1&playsinline=1&rel=0"
        frameborder="0"
        allow="autoplay; encrypted-media"
      ></iframe>
    </div>
  </body>
</html>
`;

const YouTubeVideo = () => {
  const [activeUrl, setActiveUrl] = useState(SHORTS[0]);

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      setActiveUrl(viewableItems[0].item);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 80,
  }).current;

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <FlatList
        data={SHORTS}
        // 👇 Vertical Scroll settings
        pagingEnabled 
        showsVerticalScrollIndicator={false}
        snapToInterval={SCREEN_HEIGHT}
        snapToAlignment="start"
        decelerationRate="fast"
        // 👆 Reels behavior
        keyExtractor={(item) => item}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        renderItem={({ item }) => {
          const videoId = extractYoutubeId(item);
          const isVisible = item === activeUrl;

          return (
            <View style={styles.videoCard}>
              <WebView
                key={videoId}
                source={{
                  html: getYoutubeHtml(videoId, isVisible),
                  baseUrl: "https://www.youtube.com",
                }}
                style={styles.webview}
                javaScriptEnabled
                domStorageEnabled
                allowsInlineMediaPlayback
                mediaPlaybackRequiresUserAction={false}
                scrollEnabled={false}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default memo(YouTubeVideo);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  videoCard: {
    width: width,
    height: SCREEN_HEIGHT, // Har item poori screen lega
    backgroundColor: "#000",
  },
  webview: {
    flex: 1,
    backgroundColor: "black",
  },
});