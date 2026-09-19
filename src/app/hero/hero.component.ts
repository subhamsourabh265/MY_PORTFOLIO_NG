import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROFILE } from '../data/profile';
@Component({
  selector: 'app-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: './hero.component.html',
  styles: ':host { display: block; }',
})
export class HeroComponent {
  readonly profile = PROFILE;
}
