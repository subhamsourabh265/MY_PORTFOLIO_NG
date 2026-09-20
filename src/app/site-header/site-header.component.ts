import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROFILE } from '../data/profile';

@Component({
  selector: 'app-site-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: './site-header.component.html',
  styles: ':host { display: block; }',
})
export class SiteHeaderComponent {
  profile = PROFILE;
}
