import { Config, baseConfig } from './config.base';

export const developmentConfig: Config = {
  ...baseConfig,
  environment: 'development',
  apiUrl: 'https://api.infinitixai.com/api/v1',
  apiTimeout: 5000,
} as const;
