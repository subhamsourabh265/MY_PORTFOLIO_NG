import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('Portfolio', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AppComponent] }).compileComponents();
  });

  it('renders the introduction and all sample projects', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelector('h1')?.textContent).toContain('Thoughtful design.');
    expect(page.querySelectorAll('.project').length).toBe(3);
  });

  it('filters projects through the category buttons and restores all work', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const page = fixture.nativeElement as HTMLElement;
    const buttons = page.querySelectorAll<HTMLButtonElement>('.filters button');
    buttons[2].click();
    fixture.detectChanges();
    expect(page.querySelectorAll('.project').length).toBe(1);
    expect(page.querySelector('.project-heading')?.textContent).toContain('Forma');
    expect(buttons[2].getAttribute('aria-pressed')).toBe('true');
    buttons[0].click();
    fixture.detectChanges();
    expect(page.querySelectorAll('.project').length).toBe(3);
  });

  it('uses the configured email for contact links', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.email = 'alex@example.org';
    fixture.detectChanges();
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelector('.contact-arrow')?.getAttribute('href')).toBe('mailto:alex@example.org');
  });
});
