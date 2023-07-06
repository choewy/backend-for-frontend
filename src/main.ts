import { createApp, useRouters } from './app';
import { Config } from './core';
import { AppRouter, UserRouter } from './routers';

const bootstrap = async () => {
  const config = Config();

  const port = config.getPort();
  const host = config.getHost();

  const app = createApp();

  useRouters(app, AppRouter, UserRouter);

  app.listen(port, host, () => {
    console.log(`express server running on port ${port}`);
  });
};

bootstrap();
