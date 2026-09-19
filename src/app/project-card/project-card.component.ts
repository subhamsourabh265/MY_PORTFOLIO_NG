import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Project } from '../data/projects';
@Component({
  selector: 'app-project-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: './project-card.component.html',
  styles: ':host { display: block; }',
})
export class ProjectCardComponent {
  readonly project = input.required<Project>();
}
