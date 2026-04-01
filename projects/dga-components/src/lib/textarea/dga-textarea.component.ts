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

export type DgaTextareaSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'dga-textarea',
  standalone: true,
  templateUrl: './dga-textarea.component.html',
  styleUrls: ['./dga-textarea.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DgaTextareaComponent),
      multi: true,
    },
  ],
})
export class DgaTextareaComponent implements ControlValueAccessor {
  /** Label text displayed above the textarea */
  label = input<string>('');

  /** Placeholder text */
  placeholder = input<string>('');

  /** Helper text displayed below the textarea */
  helperText = input<string>('');

  /** Error message displayed when invalid */
  errorMessage = input<string>('');

  /** Number of visible text rows */
  rows = input<number>(3);

  /** Maximum character length */
  maxLength = input<number | undefined>(undefined);

  /** Whether the textarea is disabled */
  disabled = input<boolean>(false);

  /** Whether the textarea is required */
  required = input<boolean>(false);

  /** Size variant */
  size = input<DgaTextareaSize>('md');

  /** Internal value signal */
  value = signal<string>('');

  /** Character count display */
  characterCount = computed(() => {
    const max = this.maxLength();
    if (max === undefined) return '';
    return `${this.value().length}/${max}`;
  });

  /** Computed CSS classes for the textarea element */
  textareaClasses = computed(() => {
    const classes = ['dga-textarea', `dga-textarea--${this.size()}`];
    if (this.errorMessage()) {
      classes.push('dga-textarea--error');
    }
    return classes.join(' ');
  });

  /** Computed ID for aria-describedby */
  describedBy = computed(() => {
    const ids: string[] = [];
    if (this.helperText()) ids.push('textarea-helper');
    if (this.errorMessage()) ids.push('textarea-error');
    if (this.maxLength() !== undefined) ids.push('textarea-count');
    return ids.length > 0 ? ids.join(' ') : null;
  });

  // CVA callbacks
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Handled via input signal; parent form handles disabled state
  }

  onInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.value.set(target.value);
    this.onChange(target.value);
  }

  onBlur(): void {
    this.onTouched();
  }
}
