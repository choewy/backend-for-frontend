import { App } from './app';

const bootstrap = async () => {
  const app = await App.create();

  await app.useMiddlewares();
  await app.listen();
};

bootstrap();
