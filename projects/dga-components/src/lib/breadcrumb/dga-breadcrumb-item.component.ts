import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
} from '@angular/core';

@Component({
  selector: 'dga-breadcrumb-item',
  standalone: true,
  templateUrl: './dga-breadcrumb-item.component.html',
  styleUrls: ['./dga-breadcrumb.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgaBreadcrumbItemComponent {
  /** URL to navigate to. If empty, renders as text (current page). */
  href = input<string>('');

  /** Whether this is the current/active page */
  active = input<boolean>(false);
}
