import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  signal,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'dga-radio-group',
  standalone: true,
  templateUrl: './dga-radio-group.component.html',
  styleUrls: ['./dga-radio-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DgaRadioGroupComponent),
      multi: true,
    },
  ],
})
export class DgaRadioGroupComponent implements ControlValueAccessor {
  /** Name attribute for the radio group */
  name = input<string>('');

  /** Whether the entire group is disabled */
  disabled = input<boolean>(false);

  /** Internal value signal */
  value = signal<any>(null);

  // CVA callbacks
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Handled via input signal
  }

  /** Called by child radio components */
  select(value: any): void {
    if (this.disabled()) return;
    this.value.set(value);
    this.onChange(value);
    this.onTouched();
  }
}
