import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  signal,
  computed,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type DgaSwitchSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'dga-switch',
  standalone: true,
  templateUrl: './dga-switch.component.html',
  styleUrls: ['./dga-switch.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DgaSwitchComponent),
      multi: true,
    },
  ],
})
export class DgaSwitchComponent implements ControlValueAccessor {
  /** Label text */
  label = input<string>('');

  /** Whether the switch is disabled */
  disabled = input<boolean>(false);

  /** Size variant */
  size = input<DgaSwitchSize>('md');

  /** Internal checked state */
  checked = signal<boolean>(false);

  /** Computed CSS classes for the wrapper */
  switchClasses = computed(() => {
    const classes = ['dga-switch', `dga-switch--${this.size()}`];
    if (this.checked()) classes.push('dga-switch--checked');
    if (this.disabled()) classes.push('dga-switch--disabled');
    return classes.join(' ');
  });

  // CVA callbacks
  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: boolean): void {
    this.checked.set(!!value);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Handled via input signal
  }

  toggle(): void {
    if (this.disabled()) return;
    this.checked.update(v => !v);
    this.onChange(this.checked());
    this.onTouched();
  }
}
