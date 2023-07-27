import { App } from './app';

const bootstrap = async () => {
  const app = App.create();

  await app.useMiddlewares();
  await app.listen();
};

bootstrap();
