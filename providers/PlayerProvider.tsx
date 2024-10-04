import { Track } from "@/assets/types";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type PlayerContextType = {
  track?: Track;
  setTrack?: (track: Track) => void | undefined;
};

const PlayerContext = createContext<PlayerContextType>({
  track: undefined,
  setTrack: () => {},
});

export default function PlayerProvider({ children }: PropsWithChildren) {
  const [track, setTrack] = useState<Track>();

  return (
    <PlayerContext.Provider value={{ track, setTrack }}>
      {children}
    </PlayerContext.Provider>
  );
}

export const userPlayerContext = () => useContext(PlayerContext);
