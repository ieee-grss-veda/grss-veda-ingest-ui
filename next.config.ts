import type { NextConfig } from 'next';

// Environment variable validation
// Build-time vars: must be available when `next build` runs
const requiredBuildEnvVars = [
  'NEXT_PUBLIC_KEYCLOAK_ISSUER',
  'KEYCLOAK_CLIENT_ID',
  'APP_ID',
  'INSTALLATION_ID',
];

// Runtime-only vars: only needed when the SSR server starts (provided by
// Amplify Secrets tab at runtime, not during build)
const requiredRuntimeEnvVars = [
  'KEYCLOAK_CLIENT_SECRET',
  'NEXTAUTH_SECRET',
  'GITHUB_PRIVATE_KEY',
  'INGEST_UI_EXTERNAL_ID',
];

const isBuild =
  process.env.NODE_ENV === 'production' && !process.env.NEXT_RUNTIME;

const envVarsToCheck = isBuild
  ? requiredBuildEnvVars
  : [...requiredBuildEnvVars, ...requiredRuntimeEnvVars];

const missingEnvVars = envVarsToCheck.filter((envVar) => !process.env[envVar]);

if (missingEnvVars.length > 0 && process.env.NODE_ENV !== 'test') {
  console.warn(
    `⚠️  Missing required environment variables: ${missingEnvVars.join(', ')}`
  );
  console.warn('   Please check your .env.local file');
}

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  turbopack: {
    resolveAlias: {
      '@': './src',
    },
  },
  webpack: (config) => {
    // Ensure @rjsf/antd icons are properly resolved
    config.resolve = config.resolve || {};
    config.resolve.extensionAlias = {
      ...config.resolve.extensionAlias,
      '.js': ['.js', '.ts', '.tsx'],
    };
    return config;
  },
};

const removeImports = require('next-remove-imports')();
module.exports = removeImports({
  ...nextConfig,
  experimental: { esmExternals: true },
});

export default nextConfig;
