import axios from 'axios';
import { Request, Response } from 'express';

import { SuggestionService } from '../services/suggestion.service';

export class SuggestionController {
  async suggest(req: Request, res: Response): Promise<Response> {
    const { cityName } = req.query;

    try {
      const result = await new SuggestionService().getTemperatureByCityName(
        String(cityName),
      );
      return res.json({ city: cityName, temperature: result });
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }
}
