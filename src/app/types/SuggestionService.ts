import { PlaylistItem, Track } from './Spotify';

export type SuggestionServiceParams = {
  cityName?: any;
  lat?: any;
  long?: any;
};

export type PlaylistResult = {
  playlist: PlaylistItem;
  tracks: Track[];
};
