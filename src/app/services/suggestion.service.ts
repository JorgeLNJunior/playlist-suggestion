import SpotifyAPI from 'src/api/spotify.api';
import { WeatherAPI } from 'src/api/weather.api';

import { PlaylistGenre, PlaylistItem, Track } from '../types/Spotify';

type SuggestionServiceParams = {
  cityName?: any;
  lat?: any;
  long?: any;
};

type PlaylistResult = {
  playlist: PlaylistItem;
  tracks: Track[];
};

export class SuggestionService {
  constructor(params: SuggestionServiceParams) {
    this.cityName = params.cityName;
    this.lat = params.lat;
    this.long = params.long;
  }

  private readonly cityName: string;
  private readonly lat: string;
  private readonly long: string;
  private readonly weatherApi: WeatherAPI = new WeatherAPI();
  private readonly spotifyApi: SpotifyAPI = new SpotifyAPI();

  async getPlaylist(): Promise<PlaylistResult> {
    const temperature = await this.weatherApi.getTeperatureByCityName(
      this.cityName,
    );

    const genre: PlaylistGenre =
      temperature >= 30
        ? 'party'
        : temperature >= 15 && temperature < 30
        ? 'pop'
        : temperature >= 10 && temperature <= 14
        ? 'rock'
        : 'classical';

    const playlist = await this.spotifyApi.searchPlaylist(genre);
    const tracks = await this.spotifyApi.getPlaylistTracks(playlist);

    const result: PlaylistResult = {
      playlist: playlist,
      tracks: tracks,
    };

    return result;
  }
}
