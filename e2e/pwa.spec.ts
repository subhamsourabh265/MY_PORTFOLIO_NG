import { expect, test } from '@playwright/test';

test('production PWA caches the portfolio and resume for offline visits', async ({ page, context }) => {
  test.setTimeout(90_000);
  await page.goto('/');
  const manifestHref = await page.locator('link[rel="manifest"]').getAttribute('href');
  expect(manifestHref).toBe('manifest.webmanifest');
  const manifest = await (await page.request.get('/manifest.webmanifest')).json();
  expect(manifest.display).toBe('standalone');
  for (const icon of manifest.icons) {
    const response = await page.request.get(`/${icon.src}`);
    expect(response.ok()).toBeTruthy();
    expect(response.headers()['content-type']).toContain('image/png');
  }
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
    if (!navigator.serviceWorker.controller) {
      await new Promise<void>(resolve => {
        navigator.serviceWorker.addEventListener('controllerchange', () => resolve(), { once: true });
      });
    }
  });
  // Angular initializes its application cache on the first controlled request.
  await page.reload();
  await expect.poll(() => page.evaluate(async () => {
    const cached = await caches.match(new URL('index.csr.html', location.href).href);
    return cached?.ok ?? false;
  }), { timeout: 30_000 }).toBe(true);
  const heading = await page.locator('h1').innerText();
  const resume = await page.locator('a[href$=".pdf"]').first().getAttribute('href');
  expect(resume).toBeTruthy();
  await context.setOffline(true);
  await page.reload();
  await expect(page.locator('h1')).toHaveText(heading, { useInnerText: true });
  const resumeResult = await page.evaluate(async href => {
    const response = await fetch(href!);
    return { ok: response.ok, type: response.headers.get('content-type'), size: (await response.blob()).size };
  }, resume);
  expect(resumeResult.ok).toBeTruthy();
  expect(resumeResult.type).toContain('application/pdf');
  expect(resumeResult.size).toBeGreaterThan(0);
});
