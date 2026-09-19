import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROFILE } from '../data/profile';
@Component({
  selector: 'app-site-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: './site-footer.component.html',
  styles: ':host { display: block; }',
})
export class SiteFooterComponent {
  readonly profile = PROFILE;
}
