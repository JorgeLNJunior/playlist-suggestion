import request from 'supertest';

import app from '../src/start/app';

describe('hello world', () => {
  test('GET / should return 200 and a msg property', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('msg');
  });

  test('should return 404 if route does not exist', async () => {
    const response = await request(app).get('/notFound');

    expect(response.status).toBe(404);
  });
});
