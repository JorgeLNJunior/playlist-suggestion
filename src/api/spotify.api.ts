import 'dotenv/config';
import 'colorts/lib/string';

import axios from 'axios';

export default class SpotifyAPI {
  async authenticate(): Promise<void | Error> {
    if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
      throw new Error('spotify client_id and client_secret is required'.red);
    }

    const authUrl = 'https://accounts.spotify.com/api/token';

    const encodedAuth = Buffer.from(
      `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
    ).toString('base64');

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');

    const response = await axios.post(authUrl, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${encodedAuth}`,
      },
    });

    process.env.SPOTIFY_ACCESS_TOKEN = response.data.access_token;
    console.log('spotify authentication success'.green);
  }
}
