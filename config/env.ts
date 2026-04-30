// Centralized environment configuration with typed profiles
// Switch via `NEXT_PUBLIC_APP_ENV` = 'local' | 'veda' | 'disasters'

export type AppEnv = 'local' | 'grss-veda';
export type DatasetFormSchemaProfile = 'default';

interface EnvConfig {
  OWNER: string;
  REPO: string;
  TARGET_BRANCH: string;
  AWS_REGION: string;
  NEXT_PUBLIC_AWS_S3_BUCKET_NAME: string;
  ADDITIONAL_LOGO: string;
  VEDA_BACKEND_URL: string;
  VEDA_PROD_BACKEND_URL: string;
  VEDA_TENANT_FILTER_FIELD?: string;
  DATASET_FORM_SCHEMA_PROFILE: DatasetFormSchemaProfile;
}

const profiles: Record<AppEnv, EnvConfig> = {
  local: {
    OWNER: 'ieee-grss-veda',
    REPO: 'grss-veda-data',
    TARGET_BRANCH: 'main',
    AWS_REGION: 'us-west-2',
    NEXT_PUBLIC_AWS_S3_BUCKET_NAME: 'veda-thumbnails',
    ADDITIONAL_LOGO: '',
    VEDA_BACKEND_URL: 'https://api.dev.veda.grss.cloud/',
    VEDA_PROD_BACKEND_URL: 'https://api.staging.veda.grss.cloud/',
    DATASET_FORM_SCHEMA_PROFILE: 'default',
    VEDA_TENANT_FILTER_FIELD: 'local:tenant',
  },
  "grss-veda": {
    OWNER: 'ieee-grss-veda',
    REPO: 'grss-veda-data',
    TARGET_BRANCH: 'main',
    AWS_REGION: 'us-west-2',
    NEXT_PUBLIC_AWS_S3_BUCKET_NAME: 'veda-thumbnails',
    ADDITIONAL_LOGO: '',
    VEDA_BACKEND_URL: 'https://api.staging.veda.grss-ieee.org/',
    VEDA_PROD_BACKEND_URL: 'https://api.veda.grss-ieee.org/',
    DATASET_FORM_SCHEMA_PROFILE: 'default'
  },
};

const getAppEnv = (): AppEnv => {
  const raw = process.env.NEXT_PUBLIC_APP_ENV?.toLowerCase();
  if (raw === 'veda' || raw === 'disasters' || raw === 'local' || raw === 'eic')
    return raw;
  return 'local';
};

export const APP_ENV: AppEnv = getAppEnv();
export const cfg: EnvConfig = profiles[APP_ENV];
export const VEDA_BACKEND_URL = cfg.VEDA_BACKEND_URL;
export const VEDA_PROD_BACKEND_URL = cfg.VEDA_PROD_BACKEND_URL;
