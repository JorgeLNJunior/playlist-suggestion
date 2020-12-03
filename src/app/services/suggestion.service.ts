import SpotifyAPI from '../../api/spotify.api';
import { WeatherAPI } from '../../api/weather.api';
import { PlaylistGenre } from '../types/Spotify';
import {
  PlaylistResult,
  SuggestionServiceParams,
} from '../types/SuggestionService';

export class SuggestionService {
  constructor(params: SuggestionServiceParams) {
    this.cityName = params.cityName;
    this.lat = params.lat;
    this.lon = params.lon;
  }

  private readonly cityName: string;
  private readonly lat: string;
  private readonly lon: string;
  private readonly weatherApi: WeatherAPI = new WeatherAPI();
  private readonly spotifyApi: SpotifyAPI = new SpotifyAPI();

  async getPlaylist(): Promise<PlaylistResult> {
    let temperature: number;

    if (this.cityName) {
      temperature = await this.weatherApi.getTeperatureByCityName(
        this.cityName,
      );
    } else if (this.lat && this.lon) {
      temperature = await this.weatherApi.getTemperatureByCoordinates(
        this.lat,
        this.lon,
      );
    }

    console.log(temperature);

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
