import { config } from 'dotenv';

config({ path: '.env' });

export const Config = () => {
  const getTimeZone = (): string => {
    const value = process.env.TZ;

    if (!value) {
      throw new Error('Not Found TimeZone In Config.');
    }

    return value;
  };

  const getHost = (): string => {
    const value = process.env.HOST;

    if (!value) {
      throw new Error('Not Found Host In Config.');
    }

    return value;
  };

  const getPort = (): number => {
    let value = process.env.PORT;

    if (!value) {
      throw new Error('Not Found Port In Config.');
    }

    if (isNaN(Number(value))) {
      throw new Error('Invalid Port In Config.');
    }

    return Number(value);
  };

  return { getTimeZone, getPort, getHost };
};
