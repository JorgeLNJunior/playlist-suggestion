import request from 'supertest';

import SpotifyAPI from '../src/api/spotify.api';
import app from '../src/start/app';

describe('suggestion route', () => {
  beforeAll(async () => await new SpotifyAPI().authenticate());

  test('GET /suggestion should return properties "city", "temperature" and "playlist"', async () => {
    const response = await request(app).get('/suggestion').query({
      cityName: 'new york',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('city');
    expect(response.body).toHaveProperty('temperature');
    expect(response.body).toHaveProperty('playlist');
  });
});
