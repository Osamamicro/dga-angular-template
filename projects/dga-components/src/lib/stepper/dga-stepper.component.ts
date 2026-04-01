import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  output,
  computed,
  contentChildren,
} from '@angular/core';
import { DgaStepComponent } from './dga-step.component';

export type DgaStepperOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'dga-stepper',
  standalone: true,
  templateUrl: './dga-stepper.component.html',
  styleUrls: ['./dga-stepper.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgaStepperComponent {
  /** Current active step index (0-based) */
  activeStep = input<number>(0);

  /** Layout orientation */
  orientation = input<DgaStepperOrientation>('horizontal');

  /** Whether steps are clickable */
  clickable = input<boolean>(false);

  /** Emits when a step is clicked */
  stepChange = output<number>();

  /** Query child dga-step components */
  steps = contentChildren(DgaStepComponent);

  /** Computed stepper container classes */
  stepperClasses = computed(() => {
    return `dga-stepper dga-stepper--${this.orientation()}`;
  });

  /** Get the state of a step by index */
  getStepState(index: number): string {
    const active = this.activeStep();
    if (index < active) return 'completed';
    if (index === active) return 'current';
    return 'upcoming';
  }

  /** Handle step click */
  onStepClick(index: number): void {
    if (this.clickable()) {
      this.stepChange.emit(index);
    }
  }
}
