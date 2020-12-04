import { Track } from './Spotify';

export type SuggestionServiceParams = {
  cityName?: any;
  lat?: any;
  lon?: any;
};

export type PlaylistResponse = {
  temperature: number;
  playlist: {
    name: string;
    description: string;
    urls: {
      api: string;
      spotify: string;
    };
    tracks: Array<Track>;
  };
};
