import dotenv from 'dotenv';

dotenv.config();

type Origin = string | boolean | RegExp;
type Port = string | number | undefined;

type Config = {
  apiPrefix: string;
  apiVersion: string;
  host: string;
  appPort: Port;
  port: Port;
  appUrl: Origin;
  apiUrl: string;
};

const config: Config = {
  apiPrefix: 'api',
  apiVersion: 'v1',
  appPort: process.env.APP_PORT || 3000,
  host: 'http://localhost',
  port: process.env.PORT || 8000,
  get appUrl(): Origin {
    return `${this.host}:${this.appPort}`;
  },
  get apiUrl() {
    return `${this.host}:${this.port}`;
  },
};

export default config;
