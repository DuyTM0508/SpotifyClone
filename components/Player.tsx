import { tracks } from "@/assets/data/tracks";
import { userPlayerContext } from "@/providers/PlayerProvider";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";

const Player = () => {
  //!State
  const { track } = userPlayerContext();
  const image = track?.album.images?.[0];
  const [sound, setSound] = useState<Sound>();
  const [isPlaying, setIsPlaying] = useState(false);

  //!Function
  if (!tracks) {
    return null;
  }

  useEffect(() => {
    playTrack();
  }, [track]);

  const playTrack = async () => {
    if (sound) {
      await sound.unloadAsync();
    }

    if (!track?.preview_url) {
      return;
    }

    const { sound: newSound } = await Audio.Sound.createAsync({
      uri: track.preview_url,
    });

    setSound(newSound);
    setIsPlaying(true);

    await newSound.playAsync();
  };

  const pauseTrack = async () => {
    if (sound) {
      await sound.pauseAsync();
    }
  };

  //!Render
  return (
    <>
      {track && (
        <View style={styles.container}>
          <View style={styles.player}>
            {image && (
              <Image source={{ uri: image.url }} style={styles.image} />
            )}

            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{track?.name}</Text>
              <Text style={styles.subtitle}>{track?.artists[0]?.name}</Text>
            </View>

            <Ionicons
              name={"heart-outline"}
              size={20}
              color={"white"}
              style={{ marginHorizontal: 10 }}
            />
            {isPlaying ? (
              <Ionicons
                disabled={!track?.preview_url}
                name={"pause"}
                size={22}
                color={"white"}
                onPress={async () => {
                  await pauseTrack();
                  setIsPlaying(false);
                }}
              />
            ) : (
              <Ionicons
                disabled={!track?.preview_url}
                name={"play"}
                size={22}
                color={track?.preview_url ? "white" : "gray"}
                onPress={async () => {
                  await playTrack();
                  setIsPlaying(true);
                }}
              />
            )}
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    top: -70,
    height: 75,
    padding: 10,
  },
  player: {
    backgroundColor: "#286660",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    padding: 3,
    paddingRight: 15,
  },
  title: {
    color: "white",
  },
  subtitle: {
    color: "lightgray",
    fontSize: 12,
  },
  image: {
    height: "100%",
    aspectRatio: 1,
    marginRight: 10,
    borderRadius: 5,
  },
});

export default Player;
