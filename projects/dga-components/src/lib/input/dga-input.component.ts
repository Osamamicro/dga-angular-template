import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { NgClass } from '@angular/common';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

/** Supported input types for the DGA input component. */
export type DgaInputType = 'text' | 'number' | 'email' | 'password' | 'search';

/** Available size variants for the DGA input component. */
export type DgaInputSize = 'sm' | 'md' | 'lg';

/** Auto-incrementing counter for generating unique input IDs. */
let nextInputId = 0;

@Component({
  selector: 'dga-input',
  standalone: true,
  imports: [NgClass],
  templateUrl: './dga-input.component.html',
  styleUrls: ['./dga-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DgaInputComponent),
      multi: true,
    },
  ],
})
export class DgaInputComponent implements ControlValueAccessor {

  /** The native input type. */
  readonly type = input<DgaInputType>('text');

  /** Optional label text displayed above the input. */
  readonly label = input<string | undefined>(undefined);

  /** Placeholder text shown when the input is empty. */
  readonly placeholder = input<string>('');

  /** Optional helper text displayed below the input. */
  readonly helperText = input<string | undefined>(undefined);

  /** Error message displayed when the input is in an error state. */
  readonly errorMessage = input<string | undefined>(undefined);

  /** Size variant of the input. */
  readonly size = input<DgaInputSize>('lg');

  /** Whether the input is disabled. */
  readonly disabled = input<boolean>(false);

  /** Whether the input is readonly. */
  readonly readonly = input<boolean>(false);

  /** Whether the input is required. */
  readonly required = input<boolean>(false);

  /** Maximum character length. When set, a character counter is displayed. */
  readonly maxLength = input<number | undefined>(undefined);

  /** The current input value. */
  readonly value = signal('');

  /** Whether the input has been touched (blurred). */
  readonly touched = signal(false);

  /** Unique ID for this input instance. */
  readonly inputId = `dga-input-${nextInputId++}`;

  /** Whether the input is currently disabled via CVA. */
  readonly isDisabled = signal(false);

  /** Whether the input has an error. */
  readonly hasError = computed(() => {
    const msg = this.errorMessage();
    return msg !== undefined && msg !== '';
  });

  /** Character count string when maxLength is set. */
  readonly characterCount = computed(() => {
    const max = this.maxLength();
    if (max === undefined) {
      return undefined;
    }
    return `${this.value().length}/${max}`;
  });

  /** Computed CSS classes for the input element. */
  readonly inputClasses = computed(() => {
    const classes: Record<string, boolean> = {
      'dga-input': true,
      [`dga-input--${this.size()}`]: true,
      'dga-input--error': this.hasError(),
      'dga-input--disabled': this.disabled() || this.isDisabled(),
      'dga-input--readonly': this.readonly(),
    };
    return classes;
  });

  /** ID for the helper/error description element, used by aria-describedby. */
  readonly describedById = computed(() => {
    if (this.hasError()) {
      return `${this.inputId}-error`;
    }
    if (this.helperText() !== undefined) {
      return `${this.inputId}-helper`;
    }
    return null;
  });

  // ControlValueAccessor callbacks
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string | null): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  /** Handles native input events and propagates the value. */
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value.set(target.value);
    this.onChange(target.value);
  }

  /** Handles blur events and marks the control as touched. */
  onBlur(): void {
    if (!this.touched()) {
      this.touched.set(true);
      this.onTouched();
    }
  }
}
