import { Router } from 'express';

import { HelloWorldController } from './app/controllers/helloWorld.controller';

const router = Router();

router.get('/', new HelloWorldController().helloWorld);

export default router;
