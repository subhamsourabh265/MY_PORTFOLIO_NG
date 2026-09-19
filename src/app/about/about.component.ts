import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SKILL_GROUPS } from '../data/skills';
@Component({
  selector: 'app-about',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: './about.component.html',
  styles: ':host { display: block; }',
})
export class AboutComponent {
  readonly skillGroups = SKILL_GROUPS;
}
