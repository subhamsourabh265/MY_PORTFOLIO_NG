import { provideZonelessChangeDetection } from '@angular/core';
import {
  DeferBlockBehavior,
  DeferBlockState,
  TestBed,
} from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { PROJECTS } from './data/projects';
import { PROFILE } from './data/profile';

describe('Portfolio shell', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideZonelessChangeDetection(), provideRouter(routes)],
      deferBlockBehavior: DeferBlockBehavior.Manual,
    }).compileComponents();
  });

  it('loads the route and retains focusable anchor targets before deferred content loads', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await TestBed.inject(Router).navigateByUrl('/');
    await fixture.whenStable();
    const page: HTMLElement = fixture.nativeElement;
    expect(page.querySelectorAll('h1').length).toBe(1);
    expect(page.querySelector('#hero-heading')?.textContent?.trim()).toBeTruthy();
    expect(page.querySelector('#main')?.getAttribute('tabindex')).toBe('-1');
    for (const id of ['work', 'about', 'experience', 'contact']) {
      expect(page.querySelector(`#${id}`)?.getAttribute('tabindex')).toBe('-1');
    }
    const blocks = await fixture.getDeferBlocks();
    expect(blocks.length).toBe(2);
    expect(page.querySelector('app-about')).toBeNull();
    for (const block of blocks) await block.render(DeferBlockState.Complete);
    expect(page.querySelector('#about-heading')?.textContent).toContain(
      'Architecture',
    );
    expect(page.querySelector('#experience-heading')?.textContent).toContain(
      'Leading teams.',
    );
    expect(page.querySelectorAll('.project').length).toBe(PROJECTS.length);
    expect(page.querySelector('.contact-arrow')?.getAttribute('href')).toBe(
      `mailto:${PROFILE.email}`,
    );
  });

  it('provides a readable fallback when a deferred chunk fails', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await TestBed.inject(Router).navigateByUrl('/');
    await fixture.whenStable();
    const blocks = await fixture.getDeferBlocks();
    for (const block of blocks) await block.render(DeferBlockState.Error);
    const page: HTMLElement = fixture.nativeElement;
    expect(page.querySelector('#about [role="alert"]')?.textContent).toContain(
      'Unable to load about',
    );
    for (const section of ['about', 'experience']) {
      expect(page.querySelector(`#${section} a[href$=".pdf"]`)?.getAttribute('href')).toBe(PROFILE.resume);
    }
  });
});
