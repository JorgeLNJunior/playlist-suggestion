import { Request, Response } from 'express';

import { SuggestionService } from '../services/suggestion.service';

export class SuggestionController {
  async suggest(req: Request, res: Response): Promise<Response> {
    const { cityName } = req.query;

    try {
      const result = await new SuggestionService().getTemperatureByCityName(
        String(cityName),
      );
      const playlist = await new SuggestionService().getPlaylistByTemperature(
        result,
      );
      const tracks = await new SuggestionService().getPlaylistTracks(playlist);
      return res.json({
        city: cityName,
        temperature: result,
        playlist: playlist,
        tracks: tracks,
      });
    } catch (error) {
      if (error.response) {
        return res.status(400).json({ error: error.response.data });
      }
      return res.status(500).json({ error: error });
    }
  }
}
