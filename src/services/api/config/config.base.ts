export interface Config {
  apiUrl: string;
  environment: string;
  apiTimeout: number;
}

export const baseConfig: Partial<Config> = {
  apiTimeout: 30000,
};
