import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  use: {
    baseURL: 'http://localhost:4300',
    trace: 'retain-on-failure',
    ...devices['Desktop Edge'],
    channel: 'msedge',
  },
  webServer: {
    command: 'node dist/my_portfolio/server/server.mjs',
    env: { PORT: '4300' },
    url: 'http://localhost:4300',
    reuseExistingServer: false,
  },
});
