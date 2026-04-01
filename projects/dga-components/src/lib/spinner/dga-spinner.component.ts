import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  computed,
} from '@angular/core';

export type DgaSpinnerSize = 'sm' | 'md' | 'lg';
export type DgaSpinnerColor = 'primary' | 'secondary' | 'neutral' | 'white';

@Component({
  selector: 'dga-spinner',
  standalone: true,
  templateUrl: './dga-spinner.component.html',
  styleUrls: ['./dga-spinner.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgaSpinnerComponent {
  /** Size of the spinner */
  size = input<DgaSpinnerSize>('md');

  /** Color variant */
  color = input<DgaSpinnerColor>('primary');

  /** Accessible label */
  ariaLabel = input<string>('Loading');

  /** CSS classes */
  spinnerClasses = computed(() => {
    return `dga-spinner dga-spinner--${this.size()} dga-spinner--${this.color()}`;
  });
}
