import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-site-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: './site-header.component.html',
  styles: ':host { display: block; }'
})
export class SiteHeaderComponent {

}
