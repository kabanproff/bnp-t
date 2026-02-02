interface EnvConfig {
  baseUrl: string;
  mode: string;
}

export const envConfig: EnvConfig = {
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  mode: import.meta.env.MODE,
};

const validateConfig = (config: EnvConfig): void => {
  try {
    new URL(config.baseUrl);
  } catch (e) {
    console.error('❌ Invalid base URL:',e, config.baseUrl);
    throw new Error(`Invalid base URL: ${config.baseUrl,e}`);
  }
};

validateConfig(envConfig);
export default envConfig;
