import axios from 'axios';

export class WeatherAPI {
  async getTeperatureByCityName(cityName: string): Promise<number> {
    const api = `http://api.openweathermap.org/data/2.5/weather`;

    const response = await axios.get(api, {
      params: {
        q: cityName,
        appid: process.env.OPEN_WEATHER_KEY,
        units: 'metric',
      },
    });

    const integerTemperature = Number(
      String(response.data.main.temp).split('.')[0], // removing everything after the dot
    );

    return integerTemperature;
  }

  async getTemperatureByCoordinates(lat: string, lon: string): Promise<number> {
    const api = `http://api.openweathermap.org/data/2.5/weather`;

    const response = await axios.get(api, {
      params: {
        appid: process.env.OPEN_WEATHER_KEY,
        lat: lat,
        lon: lon,
        units: 'metric',
      },
    });

    const integerTemperature = Number(
      String(response.data.main.temp).split('.')[0], // removing everything after the dot
    );

    return integerTemperature;
  }
}
