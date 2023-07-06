import { Handler } from 'express';

import { AppService } from '../services';

export const AppController = () => {
  const appService = AppService();

  /** @test curl -X GET http://localhost:4000 */
  const sayHi: Handler = (_, res, __) => {
    return res.send({ message: appService.getMessage() });
  };

  /** @test curl -X GET http://localhost:4000/versions */
  const getVersion: Handler = (_, res, __) => {
    return res.send({ version: appService.getVersion() });
  };

  return { sayHi, getVersion };
};
