import { Config, baseConfig } from './config.base';

export const developmentConfig: Config = {
  ...baseConfig,
  environment: 'development',
  apiUrl: 'http://localhost/api/v1',
  apiTimeout: 5000,
} as const;
