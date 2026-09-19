import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { WorkComponent } from './work.component';

describe('Work filtering without Zone.js', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();
  });

  it('updates results from signals without manually triggering change detection', async () => {
    const fixture = TestBed.createComponent(WorkComponent);
    await fixture.whenStable();
    const page: HTMLElement = fixture.nativeElement;
    expect('Zone' in globalThis).toBeFalse();
    fixture.componentInstance.selectedFilter.set('Publicis Sapient');
    await fixture.whenStable();
    expect(page.querySelectorAll('.project').length).toBe(1);
    expect(page.querySelector('[role="status"]')?.textContent).toContain('Showing 1 contribution: Publicis Sapient');
    const buttons = page.querySelectorAll<HTMLButtonElement>('.filters button');
    buttons[2].click();
    await fixture.whenStable();
    expect(page.querySelectorAll('.project').length).toBe(2);
    expect(buttons[2].getAttribute('aria-pressed')).toBe('true');
    expect(buttons[1].getAttribute('aria-pressed')).toBe('false');
    buttons[0].click();
    await fixture.whenStable();
    expect(page.querySelectorAll('.project').length).toBe(3);
  });
});
