import { Request, Response } from 'express';

export class HelloWorldController {
  async helloWorld(req: Request, res: Response): Promise<Response> {
    return res.json({ msg: 'hello world' });
  }
}
