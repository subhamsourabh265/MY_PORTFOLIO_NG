import { defineConfig } from '@playwright/test';
import baseConfig from './playwright.config';

// A demo project keeps local Hosting checks independent of a real Firebase account.
export default defineConfig({
  ...baseConfig,
  use: { ...baseConfig.use, baseURL: 'http://127.0.0.1:5000' },
  webServer: {
    command: 'firebase emulators:start --only hosting --project demo-my-portfolio',
    url: 'http://127.0.0.1:5000',
    reuseExistingServer: false,
    timeout: 120_000
  }
});
