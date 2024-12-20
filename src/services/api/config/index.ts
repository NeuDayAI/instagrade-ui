import { Config } from './config.base';
import { stagingConfig } from './config.staging';
import { productionConfig } from './config.production';
import { developmentConfig } from './config.development';

const getConfig = (): Config => {
  console.log(process.env.NODE_ENV);
  switch (process.env.NODE_ENV) {
    case 'production':
      return productionConfig;
    case 'staging':
      return stagingConfig;
    case 'development':
    default:
      return developmentConfig;
  }
};

export const config = getConfig();
