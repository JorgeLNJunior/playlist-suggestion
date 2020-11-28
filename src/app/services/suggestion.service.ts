import axios from 'axios';

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
}
