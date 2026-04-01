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

export type DgaCheckboxSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'dga-checkbox',
  standalone: true,
  templateUrl: './dga-checkbox.component.html',
  styleUrls: ['./dga-checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DgaCheckboxComponent),
      multi: true,
    },
  ],
})
export class DgaCheckboxComponent implements ControlValueAccessor {
  /** Label text */
  label = input<string>('');

  /** Whether the checkbox is disabled */
  disabled = input<boolean>(false);

  /** Whether the checkbox is in indeterminate state */
  indeterminate = input<boolean>(false);

  /** Size variant */
  size = input<DgaCheckboxSize>('md');

  /** Internal checked state */
  checked = signal<boolean>(false);

  /** Computed aria-checked value */
  ariaChecked = computed(() => {
    if (this.indeterminate()) return 'mixed';
    return this.checked().toString();
  });

  /** Computed CSS classes for the checkbox wrapper */
  checkboxClasses = computed(() => {
    const classes = ['dga-checkbox', `dga-checkbox--${this.size()}`];
    if (this.checked()) classes.push('dga-checkbox--checked');
    if (this.indeterminate()) classes.push('dga-checkbox--indeterminate');
    if (this.disabled()) classes.push('dga-checkbox--disabled');
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
