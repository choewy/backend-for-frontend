import cors from 'cors';
import express, { Express, json } from 'express';

import { ConfigService } from './core';
import { Logger } from './utils';

export class App {
  private static APP_NAME = 'backend-for-frontend';

  public static async create() {
    Logger.forRoot(this.APP_NAME);

    return new App();
  }

  private readonly app: Express;

  private readonly logger = Logger.of(App.name);
  private readonly configService = ConfigService.of();

  constructor() {
    this.app = express();
  }

  async useMiddlewares() {
    this.app.use(json());
    this.app.use(cors());
  }

  async listen() {
    const { port, host } = this.configService.getListenOptions();

    this.app.listen(port, host, () => {
      this.logger.info(`server running on port ${port}`);
    });
  }
}
