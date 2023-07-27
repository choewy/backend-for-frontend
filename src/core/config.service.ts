import 'dotenv/config';
import { ListenOptions } from './interfaces';

export class ConfigService {
  private static instance: ConfigService | undefined;

  public static of() {
    if (!this.instance) {
      this.instance = new ConfigService();
    }

    return this.instance;
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
