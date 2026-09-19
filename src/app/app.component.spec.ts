import { provideZonelessChangeDetection } from '@angular/core';
import {
  DeferBlockBehavior,
  DeferBlockState,
  TestBed,
} from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

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
    expect(page.querySelector('h1')?.textContent).toContain(
      'Scalable frontends.',
    );
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
    expect(page.querySelectorAll('.project').length).toBe(3);
    expect(page.querySelector('.contact-arrow')?.getAttribute('href')).toBe(
      'mailto:sourabh.shubham120@gmail.com',
    );
  });

  it('provides a readable fallback when a deferred chunk fails', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await TestBed.inject(Router).navigateByUrl('/');
    await fixture.whenStable();
    const [about] = await fixture.getDeferBlocks();
    await about.render(DeferBlockState.Error);
    const page: HTMLElement = fixture.nativeElement;
    expect(page.querySelector('#about [role="alert"]')?.textContent).toContain(
      'Unable to load about',
    );
    expect(page.querySelector('#about a[href$=".pdf"]')).not.toBeNull();
  });
});
