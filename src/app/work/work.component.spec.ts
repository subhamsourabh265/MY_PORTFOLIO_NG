import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { WorkComponent } from './work.component';
import { PROJECTS } from '../data/projects';

describe('Work filtering without Zone.js', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('updates results from signals without manually triggering change detection', async () => {
    const fixture = TestBed.createComponent(WorkComponent);
    await fixture.whenStable();
    const page: HTMLElement = fixture.nativeElement;
    const projectNames = () =>
      Array.from(page.querySelectorAll('.project-heading h3'), (heading) =>
        heading.textContent?.trim(),
      );
    const sapientProjects = PROJECTS.filter(
      (project) => project.category === 'Publicis Sapient',
    );
    const tcsProjects = PROJECTS.filter(
      (project) => project.category === 'Tata Consultancy Services',
    );
    expect('Zone' in globalThis).toBeFalse();
    expect(projectNames()).toEqual(PROJECTS.map((project) => project.name));
    fixture.componentInstance.selectedFilter.set('Publicis Sapient');
    await fixture.whenStable();
    expect(projectNames()).toEqual(
      sapientProjects.map((project) => project.name),
    );
    expect(
      page
        .querySelector('[role="status"]')
        ?.textContent?.replace(/\s+/g, ' ')
        .trim(),
    ).toBe(
      `Showing contribution${sapientProjects.length === 1 ? '' : 's'}: Publicis Sapient.`,
    );
    const buttons = Array.from(
      page.querySelectorAll<HTMLButtonElement>('.filters button'),
    );
    const tcsButton = buttons.find((button) =>
      button.textContent?.includes('Tata Consultancy Services'),
    )!;
    const sapientButton = buttons.find((button) =>
      button.textContent?.includes('Publicis Sapient'),
    )!;
    const allButton = buttons.find((button) =>
      button.textContent?.includes('All work'),
    )!;
    expect(tcsButton.disabled).toBeFalse();
    tcsButton.click();
    await fixture.whenStable();
    expect(projectNames()).toEqual(tcsProjects.map((project) => project.name));
    expect(tcsButton.getAttribute('aria-pressed')).toBe('true');
    expect(sapientButton.getAttribute('aria-pressed')).toBe('false');
    allButton.click();
    await fixture.whenStable();
    expect(projectNames()).toEqual(PROJECTS.map((project) => project.name));
    expect(allButton.getAttribute('aria-pressed')).toBe('true');
    expect(tcsButton.getAttribute('aria-pressed')).toBe('false');
  });
});
