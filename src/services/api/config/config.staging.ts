import { Config, baseConfig } from './config.base';

export const stagingConfig: Config = {
  ...baseConfig,
  environment: 'staging',
  apiUrl: 'https://staging-api.instagrade.com/api',
  apiTimeout: 10000,
} as const;
