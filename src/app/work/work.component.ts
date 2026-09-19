import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { PROJECTS, ProjectFilter } from '../data/projects';
import { ProjectCardComponent } from '../project-card/project-card.component';
@Component({
  selector: 'app-work',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProjectCardComponent],
  templateUrl: './work.component.html',
  styles: ':host { display: block; }',
})
export class WorkComponent {
  // Keep server-rendered controls disabled until their event handlers are ready.
  // afterNextRender does not run on the server.
  readonly interactive = signal(false);
  constructor() {
    afterNextRender(() => this.interactive.set(true));
  }

  readonly filters: readonly ProjectFilter[] = [
    'All work',
    'Publicis Sapient',
    'TCS',
  ];
  readonly selectedFilter = signal<ProjectFilter>('All work');
  readonly visibleProjects = computed(() =>
    PROJECTS.filter(
      (project) =>
        this.selectedFilter() === 'All work' ||
        project.category === this.selectedFilter(),
    ),
  );
  readonly filterCounts = Object.fromEntries(
    this.filters.map((filter) => [
      filter,
      PROJECTS.filter(
        (project) => filter === 'All work' || project.category === filter,
      ).length,
    ]),
  ) as Record<ProjectFilter, number>;
}
