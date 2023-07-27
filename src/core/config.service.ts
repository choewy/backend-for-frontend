import 'dotenv/config';
import { ListenOptions } from './interfaces';

export class ConfigService {
  public static of() {
    return new ConfigService();
  }

  private readonly TZ = process.env.TZ;

  private readonly HOST: string = process.env.HOST || '::';
  private readonly PORT: number = Number(process.env.PORT || 3000);

  public getListenOptions(): ListenOptions {
    return {
      host: this.HOST,
      port: this.PORT,
    };
  }
}
