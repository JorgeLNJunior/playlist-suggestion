import { Request, Response } from 'express';

import { SuggestionService } from '../services/suggestion.service';

export class SuggestionController {
  async suggest(req: Request, res: Response): Promise<Response> {
    const { cityName, lat, lon } = req.query;

    const suggestionService = new SuggestionService({
      cityName: cityName,
      lat: lat,
      lon: lon,
    });

    try {
      const playlist = await suggestionService.getPlaylist();
      return res.json(playlist);
    } catch (error) {
      if (error.response) {
        return res.status(400).json({ error: error.response.data });
      }
      return res.status(500).json({ error: error });
    }
  }
}
