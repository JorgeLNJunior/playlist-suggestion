import { Router } from 'express';

import { SuggestionController } from './app/controllers/suggestion.controller';

const router = Router();

router.get('/suggestion', new SuggestionController().suggest);

export default router;
