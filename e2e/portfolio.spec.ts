import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFile } from 'node:fs/promises';
import { PROJECTS } from '../src/app/data/projects';

test('SSR includes deferred resume content and does not depend on JavaScript', async ({
  browser,
  request,
  baseURL,
}) => {
  const response = await request.get('/');
  expect(response.ok()).toBeTruthy();
  const html = await response.text();
  expect(html).toContain('AWS Certified Cloud Practitioner');
  expect(html).toContain('MY ENGINEERING TOOLKIT');
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
  await page.getByRole('link', { name: 'Experience', exact: true }).click();
  await expect(page.locator('#experience')).toBeInViewport();
  await expect(
    page.getByText('AWS Certified Cloud Practitioner', { exact: true }),
  ).toBeVisible();
  await context.close();
});

test('keyboard navigation, zoneless filtering, and disclosures', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  const employer = 'Tata Consultancy Services';
  const expectedProjects = PROJECTS.filter(project => project.category === employer);
  const tcs = page.getByRole('button', { name: employer });
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
  await expect(page.locator('.project-heading h3')).toHaveText(expectedProjects.map(project => project.name));
  await expect(tcs).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('status')).toContainText(
    `Showing ${expectedProjects.length} contribution${expectedProjects.length === 1 ? '' : 's'}: ${employer}`,
  );
  const disclosure = page.locator('summary').first();
  await disclosure.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('details').first()).toHaveAttribute('open', '');
  await page.getByRole('button', { name: 'All work' }).click();
  await expect(page.locator('.project-heading h3')).toHaveText(PROJECTS.map(project => project.name));
  await expect(tcs).toHaveAttribute('aria-pressed', 'false');
  await page.getByRole('link', { name: 'Experience', exact: true }).click();
  await expect(page.locator('#experience')).toBeInViewport();
  await expect(page.locator('#experience')).toBeFocused();
  expect(errors).toEqual([]);
});

for (const section of ['.hero', '#contact']) {
  test(`resume download saves the current PDF from ${section}`, async ({ page, request }) => {
    await page.goto('/');
    const link = page.locator(section).getByRole('link', { name: 'Download resume (PDF)' });
    const url = await link.evaluate(element => (element as HTMLAnchorElement).href);
    const response = await request.get(url);
    expect(response.ok()).toBeTruthy();
    expect(response.headers()['content-type']).toContain('application/pdf');
    const pdf = await response.body();
    // A missing asset can be rewritten to index.html with HTTP 200 by Hosting.
    expect(pdf.subarray(0, 5).toString()).toBe('%PDF-');

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      link.click(),
    ]);
    expect(await download.failure()).toBeNull();
    expect(download.suggestedFilename()).toBe(decodeURIComponent(new URL(url).pathname.split('/').pop()!));
    const savedFile = await download.path();
    expect(savedFile).not.toBeNull();
    expect(await readFile(savedFile!)).toEqual(pdf);
  });
}

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
    await page.locator('.contact').screenshot({
      path: testInfo.outputPath(`contact-${width}.png`),
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
