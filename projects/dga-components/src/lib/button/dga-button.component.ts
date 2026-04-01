import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  computed,
} from '@angular/core';

export type DgaButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'icon-only'
  | 'tertiary';

export type DgaButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'dga-button',
  standalone: true,
  templateUrl: './dga-button.component.html',
  styleUrls: ['./dga-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgaButtonComponent {
  /** Visual variant of the button */
  variant = input<DgaButtonVariant>('primary');

  /** Size of the button */
  size = input<DgaButtonSize>('lg');

  /** Whether the button is disabled */
  disabled = input<boolean>(false);

  /** Whether the button is in a loading state */
  loading = input<boolean>(false);

  /** Native button type attribute */
  type = input<'button' | 'submit' | 'reset'>('button');

  /** Accessible label for the button */
  ariaLabel = input<string | undefined>(undefined);

  /** Whether the button stretches to full container width */
  fullWidth = input<boolean>(false);

  /** Computed CSS class string based on variant, size, and state */
  buttonClasses = computed(() => {
    const classes = [
      'dga-btn',
      `dga-btn-${this.variant()}`,
      `dga-btn-${this.size()}`,
    ];

    if (this.loading()) {
      classes.push('dga-btn--loading');
    }

    if (this.fullWidth()) {
      classes.push('dga-btn--full-width');
    }

    return classes.join(' ');
  });
}
