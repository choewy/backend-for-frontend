import { LogColor, LogType } from './enums';

export class Logger {
  public static of(context?: string) {
    return new Logger(context);
  }

  constructor(public readonly context?: string) {}

  private makeForm(
    type: LogType,
    color: LogColor,
    message?: string,
    params?: object,
  ): string {
    const form: string[] = [
      `[${type.toUpperCase()}]`,
      new Date().toLocaleString(),
    ];

    if (this.context) {
      form.push(`[${this.context}]`);
    }

    if (message) {
      form.push(message);
    }

    if (params) {
      form.push(` - ${JSON.stringify(params, null, 2)}`);
    }

    return [color, form.join(' ')].concat([color]).join('');
  }

  public log(message: string, params?: object): void {
    return console.log(
      this.makeForm(LogType.LOG, LogColor.FG_GREEN, message, params),
    );
  }

  public info(message: string, params?: object): void {
    return console.log(
      this.makeForm(LogType.INFO, LogColor.FG_CYAN, message, params),
    );
  }

  public verbose(message: string, params?: object): void {
    return console.log(
      this.makeForm(LogType.VERBOSE, LogColor.FG_BLUE, message, params),
    );
  }

  public debug(message: string, params?: object): void {
    return console.log(
      this.makeForm(LogType.DEBUG, LogColor.FG_MEGENTA, message, params),
    );
  }

  public warn(message: string, params?: object): void {
    return console.log(
      this.makeForm(LogType.WARNING, LogColor.FG_YELLOW, message, params),
    );
  }

  public error(message: string, params?: object, stack?: string): void {
    return console.log(
      this.makeForm(
        LogType.ERROR,
        LogColor.FG_RED,
        message,
        stack ? { ...(params || {}), stack } : params,
      ),
    );
  }
}
