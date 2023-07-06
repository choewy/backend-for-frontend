import { Handler } from 'express';

import { AppService } from '../services';

export const AppController = () => {
  const appService = AppService();

  const sayHi: Handler = (_, res, __) => {
    return res.send({ message: appService.getMessage() });
  };

  const getVersion: Handler = (_, res, __) => {
    return res.send({ version: appService.getVersion() });
  };

  return { sayHi, getVersion };
};
