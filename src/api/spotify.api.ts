import 'dotenv/config';
import 'colorts/lib/string';

import axios from 'axios';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { PlaylistGenre, PlaylistItem, Track } from '../app/types/Spotify';

export default class SpotifyAPI {
  async authenticate(): Promise<void> {
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

  async searchPlaylist(playlist: PlaylistGenre): Promise<PlaylistItem> {
    const api = `https://api.spotify.com/v1/search`;
    const response = await axios.get(api, {
      headers: {
        Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
      },
      params: {
        q: playlist,
        type: 'playlist',
        limit: 1,
      },
    });

    return response.data.playlists.items[0];
  }

  async getPlaylistTracks(playlist: PlaylistItem): Promise<Track[]> {
    const api = playlist.tracks.href;

    const response = await axios.get(api, {
      params: {
        limit: 20,
      },
      headers: {
        Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
      },
    });

    const tracks: Track[] = [];

    for (const r of response.data.items) {
      const q = plainToClass(Track, r.track);
      await validate(q, { whitelist: true });
      tracks.push(q);
    }

    return tracks;
  }
}
