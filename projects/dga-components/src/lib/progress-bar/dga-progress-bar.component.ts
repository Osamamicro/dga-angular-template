import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  computed,
} from '@angular/core';

export type DgaProgressBarColor = 'primary' | 'success' | 'warning' | 'danger' | 'info';

@Component({
  selector: 'dga-progress-bar',
  standalone: true,
  templateUrl: './dga-progress-bar.component.html',
  styleUrls: ['./dga-progress-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgaProgressBarComponent {
  /** Current value (0-100) */
  value = input<number>(0);

  /** Whether the progress is indeterminate */
  indeterminate = input<boolean>(false);

  /** Whether to show a label */
  showLabel = input<boolean>(false);

  /** Color variant */
  color = input<DgaProgressBarColor>('primary');

  /** Accessible label */
  ariaLabel = input<string>('Progress');

  /** CSS classes */
  barClasses = computed(() => {
    const classes = ['dga-progress-bar', `dga-progress-bar--${this.color()}`];
    if (this.indeterminate()) {
      classes.push('dga-progress-bar--indeterminate');
    }
    return classes.join(' ');
  });

  /** Clamped value between 0 and 100 */
  clampedValue = computed(() => {
    return Math.min(100, Math.max(0, this.value()));
  });

  /** Width style for the fill */
  fillWidth = computed(() => {
    return this.indeterminate() ? '50%' : `${this.clampedValue()}%`;
  });
}
