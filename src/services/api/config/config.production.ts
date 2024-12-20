import { Config, baseConfig } from './config.base';

export const productionConfig: Config = {
  ...baseConfig,
  environment: 'production',
  apiUrl: 'https://api.instagrade.com/api',
  apiTimeout: 10000,
} as const;
