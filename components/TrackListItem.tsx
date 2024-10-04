import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Track } from "@/assets/types";
import { userPlayerContext } from "@/providers/PlayerProvider";

type TrackListItemProps = {
  track: Track;
};

const TrackListItem = ({ track }: TrackListItemProps) => {
  const image = track.album?.images[0];
  const { setTrack } = userPlayerContext();

  return (
    <Pressable style={styles.container} onPress={() => setTrack && setTrack(track)}>
      {image && <Image style={styles.image} source={{ uri: image.url }} />}
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{track.name}</Text>
        <Text style={styles.subtitle}>{track.artists[0]?.name}</Text>
      </View>
    </Pressable>
  );
};

export default TrackListItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontWeight: "500",
    color: "white",
    fontSize: 16,
  },
  subtitle: {
    color: "gray",
  },
  image: {
    width: 50,
    aspectRatio: 1,
    marginRight: 10,
    borderRadius: 5,
  },
});
