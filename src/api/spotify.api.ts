import 'dotenv/config';
import 'colorts/lib/string';

import axios from 'axios';

import {
  Artist,
  PlaylistGenre,
  SpotifyPlaylistResponse,
  Track,
} from '../app/types/Spotify';

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

  // eslint-disable-next-line prettier/prettier
  async searchPlaylist(playlist: PlaylistGenre): Promise<SpotifyPlaylistResponse> {
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

    const playlistItem = response.data.playlists.items[0];

    const result = {
      name: playlistItem.name,
      description: playlistItem.description,
      urls: {
        api: playlistItem.href,
        spotify: playlistItem.external_urls.spotify,
      },
      tracks: {
        api: playlistItem.tracks.href,
        total: playlistItem.tracks.total,
      },
    };

    return result;
  }

  async getPlaylistTracks(playlist: SpotifyPlaylistResponse): Promise<Track[]> {
    const api = playlist.tracks.api;

    const response = await axios.get(api, {
      params: {
        limit: 20,
      },
      headers: {
        Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
      },
    });

    const tracks: Track[] = [];

    for (const item of response.data.items) {
      const artists: Artist[] = [];

      for (const a of item.track.artists) {
        const artist = {
          name: a.name,
          url: a.external_urls.spotify,
        };
        artists.push(artist);
      }

      const track = {
        name: item.track.name,
        artists: artists,
        url: item.track.external_urls.spotify,
      };

      tracks.push(track);
    }

    return tracks;
  }
}
