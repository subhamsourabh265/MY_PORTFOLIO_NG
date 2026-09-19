import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('SSR includes deferred resume content and does not depend on JavaScript', async ({
  browser,
  request,
}) => {
  const response = await request.get('/');
  expect(response.ok()).toBeTruthy();
  const html = await response.text();
  expect(html).toContain('AWS Certified Cloud Practitioner');
  expect(html).toContain('MY ENGINEERING TOOLKIT');
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://localhost:4300');
  await expect(page.locator('h1')).toBeVisible();
  await page.getByRole('link', { name: 'Experience', exact: true }).click();
  await expect(page.locator('#experience')).toBeInViewport();
  await expect(
    page.getByText('AWS Certified Cloud Practitioner', { exact: true }),
  ).toBeVisible();
  await context.close();
});

test('keyboard navigation, zoneless filtering, disclosures, and resume download', async ({
  page,
  request,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  const tcs = page.getByRole('button', { name: 'TCS' });
  await expect(tcs).toBeEnabled();
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('link', { name: 'Skip to content' }),
  ).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  expect(await page.evaluate(() => 'Zone' in window)).toBe(false);
  await tcs.focus();
  await expect(tcs).toBeFocused();
  await page.keyboard.press('Space');
  await expect(page.locator('.project')).toHaveCount(2);
  await expect(tcs).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('status')).toContainText(
    'Showing 2 contributions: TCS',
  );
  const disclosure = page.locator('summary').first();
  await disclosure.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('details').first()).toHaveAttribute('open', '');
  await page.getByRole('link', { name: 'Experience', exact: true }).click();
  await expect(page.locator('#experience')).toBeInViewport();
  await expect(page.locator('#experience')).toBeFocused();
  const download = await request.get(
    '/assets/Subham_Sourabh_Lead_Angular_Resume_V1.pdf',
  );
  expect(download.ok()).toBeTruthy();
  expect(download.headers()['content-type']).toContain('application/pdf');
  expect(errors).toEqual([]);
});

for (const width of [1280, 320]) {
  test(`WCAG 2.2 AA automated checks and reflow at ${width}px`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.locator('#about').scrollIntoViewIfNeeded();
    await page.locator('#experience').scrollIntoViewIfNeeded();
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await page.locator('summary').first().click();
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(results.violations).toEqual([]);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    expect(
      await page.evaluate(
        () => getComputedStyle(document.documentElement).scrollBehavior,
      ),
    ).toBe('auto');
    await page.screenshot({
      path: testInfo.outputPath(`portfolio-${width}.png`),
      fullPage: true,
    });
  });
}

test('direct links reach a deferred section after hydration', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#experience');
  await expect(page.locator('#experience')).toBeInViewport();
  await expect(page.locator('#experience-heading')).toBeVisible();
  await page.getByRole('link', { name: 'About', exact: true }).click();
  await expect(page.locator('#about')).toBeInViewport();
  await expect(page.locator('#about')).toBeFocused();
});
