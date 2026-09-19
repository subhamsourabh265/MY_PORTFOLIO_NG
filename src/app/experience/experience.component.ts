import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-experience',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: './experience.component.html',
  styles: ':host { display: block; }'
})
export class ExperienceComponent {

}
