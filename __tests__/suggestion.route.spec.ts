import cities from 'all-the-cities';
import ramdomCoordinate from 'random-coordinates';
import request from 'supertest';

import SpotifyAPI from '../src/api/spotify.api';
import app from '../src/start/app';

describe('suggestion route', () => {
  beforeAll(async () => await new SpotifyAPI().authenticate());

  test('GET /suggestion receive city name, should return a property "playlist"', async () => {
    const city = cities[Math.floor(Math.random() * cities.length)].name;

    const response = await request(app).get('/suggestion').query({
      cityName: city,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('playlist');
  });

  test('GET /suggestion receive coordinates, should return a property "playlist"', async () => {
    const coordinates: Array<string> = ramdomCoordinate()
      .replace(' ', '')
      .split(',');
    const lat = coordinates[0];
    const lon = coordinates[1];

    const response = await request(app).get('/suggestion').query({
      lat: lat,
      lon: lon,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('playlist');
  });

  test('GET /suggestion should return 400 if city does not exist', async () => {
    const city = 'undefined';

    const response = await request(app).get('/suggestion').query({
      cityName: city,
    });

    expect(response.status).toBe(400);
  });

  test('GET /notfound should return 404 if route does not exist', async () => {
    const response = await request(app).get('/notfound');

    expect(response.status).toBe(404);
  });

  test('GET /suggestion should return 400 and a error if city name or coordinates is not provided', async () => {
    const response = await request(app).get('/suggestion');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
