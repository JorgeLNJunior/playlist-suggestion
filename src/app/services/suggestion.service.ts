import axios from 'axios';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { PlaylistGenre, PlaylistItem } from '../types/Playlist';

export class SuggestionService {
  async getTemperatureByCityName(cityName: string): Promise<number> {
    const api = `http://api.openweathermap.org/data/2.5/weather`;

    const result = await axios.get(api, {
      params: {
        q: cityName,
        appid: process.env.OPEN_WEATHER_KEY,
        units: 'metric',
      },
    });

    const integerTemperature = Number(
      String(result.data.main.temp).split('.')[0], // removing everything after the dot
    );

    return integerTemperature;
  }

  async getPlaylistByTemperature(temperature: number): Promise<PlaylistItem> {
    const option: PlaylistGenre =
      temperature >= 30
        ? 'party'
        : temperature >= 15 && temperature < 30
        ? 'pop'
        : temperature >= 10 && temperature <= 14
        ? 'rock'
        : 'classical';

    const api = `https://api.spotify.com/v1/search`;
    const response = await axios.get(api, {
      headers: {
        Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
      },
      params: {
        q: option,
        type: 'playlist',
        limit: 1,
      },
    });

    const result = plainToClass(PlaylistItem, response.data.playlists.items[0]);
    await validate(result, { whitelist: true });

    return result;
  }
}
