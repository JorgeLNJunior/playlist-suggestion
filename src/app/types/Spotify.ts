export type PlaylistGenre = 'party' | 'pop' | 'rock' | 'classical';

export type SpotifyPlaylistResponse = {
  name: string;
  description: string;
  urls: {
    api: string;
    spotify: string;
  };
  tracks: {
    api: string;
    total: number;
  };
};

export type Track = {
  name: string;
  artists: Array<Artist>;
  url: string;
};

export type Artist = {
  name: string;
  url: string;
};
