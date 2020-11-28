import { Allow } from 'class-validator';

export type PlaylistGenre = 'party' | 'pop' | 'rock' | 'classical';

export class PlaylistItem {
  @Allow()
  id: string;

  @Allow()
  name: string;

  @Allow()
  description: string;

  @Allow()
  href: string;

  @Allow()
  external_urls: {
    spotify: string;
  };

  @Allow()
  tracks: {
    href: string;
    total: number;
  };
}

export class Track {
  @Allow()
  name: string;

  @Allow()
  external_urls: {
    spotify: string;
  };
}
