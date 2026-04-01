import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
} from '@angular/core';

@Component({
  selector: 'dga-breadcrumb',
  standalone: true,
  templateUrl: './dga-breadcrumb.component.html',
  styleUrls: ['./dga-breadcrumb.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgaBreadcrumbComponent {
  /** Accessible label for the navigation */
  ariaLabel = input<string>('Breadcrumb');
}
