import { PlaylistItem, Track } from './Spotify';

export type SuggestionServiceParams = {
  cityName?: any;
  lat?: any;
  lon?: any;
};

export type PlaylistResult = {
  playlist: PlaylistItem;
  tracks: Track[];
};
