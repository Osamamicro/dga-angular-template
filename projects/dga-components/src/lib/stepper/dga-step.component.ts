import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
} from '@angular/core';

export type DgaStepState = 'completed' | 'current' | 'upcoming' | 'error';

@Component({
  selector: 'dga-step',
  standalone: true,
  template: '',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgaStepComponent {
  /** Step label */
  label = input.required<string>();

  /** Optional description */
  description = input<string>('');

  /** Optional icon (not rendered by dga-step, consumed by dga-stepper) */
  icon = input<string>('');
}
