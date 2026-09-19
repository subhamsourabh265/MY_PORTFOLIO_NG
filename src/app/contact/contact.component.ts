import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROFILE } from '../data/profile';
@Component({
  selector: 'app-contact',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: './contact.component.html',
  styles: ':host { display: block; }',
})
export class ContactComponent {
  readonly profile = PROFILE;
}
