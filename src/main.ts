import { createApp } from './app';
import { Config } from './core';

const bootstrap = async () => {
  const config = Config();

  const port = config.getPort();
  const host = config.getHost();

  const app = createApp();

  app.listen(port, host, () => {
    console.log(`express server running on port ${port}`);
  });
};

bootstrap();
