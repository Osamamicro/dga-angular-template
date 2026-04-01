import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  signal,
  computed,
  forwardRef,
  ElementRef,
  inject,
  HostListener,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface DgaSelectOption {
  value: any;
  label: string;
  disabled?: boolean;
  group?: string;
}

export type DgaSelectSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'dga-select',
  standalone: true,
  templateUrl: './dga-select.component.html',
  styleUrls: ['./dga-select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DgaSelectComponent),
      multi: true,
    },
  ],
})
export class DgaSelectComponent implements ControlValueAccessor {
  private elementRef = inject(ElementRef);

  /** Label text */
  label = input<string>('');

  /** Placeholder text */
  placeholder = input<string>('اختر...');

  /** List of options */
  options = input<DgaSelectOption[]>([]);

  /** Error message */
  errorMessage = input<string>('');

  /** Helper text */
  helperText = input<string>('');

  /** Whether the select is disabled */
  disabled = input<boolean>(false);

  /** Whether the select is required */
  required = input<boolean>(false);

  /** Size variant */
  size = input<DgaSelectSize>('md');

  /** Whether search/filter is enabled */
  searchable = input<boolean>(false);

  /** Internal value */
  value = signal<any>(null);

  /** Whether the dropdown is open */
  isOpen = signal<boolean>(false);

  /** Search term for filtering */
  searchTerm = signal<string>('');

  /** Currently highlighted option index */
  highlightedIndex = signal<number>(-1);

  /** Filtered options based on search term */
  filteredOptions = computed(() => {
    const opts = this.options();
    const term = this.searchTerm().toLowerCase();
    if (!this.searchable() || !term) return opts;
    return opts.filter(o => o.label.toLowerCase().includes(term));
  });

  /** Display value for the trigger */
  displayValue = computed(() => {
    const val = this.value();
    if (val === null || val === undefined) return '';
    const opt = this.options().find(o => o.value === val);
    return opt ? opt.label : '';
  });

  /** Computed trigger classes */
  triggerClasses = computed(() => {
    const classes = ['dga-select__trigger', `dga-select__trigger--${this.size()}`];
    if (this.errorMessage()) classes.push('dga-select__trigger--error');
    if (this.isOpen()) classes.push('dga-select__trigger--open');
    return classes.join(' ');
  });

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

  toggle(): void {
    if (this.disabled()) return;
    this.isOpen.update(v => !v);
    if (this.isOpen()) {
      this.highlightedIndex.set(-1);
      this.searchTerm.set('');
    } else {
      this.onTouched();
    }
  }

  selectOption(option: DgaSelectOption): void {
    if (option.disabled) return;
    this.value.set(option.value);
    this.onChange(option.value);
    this.isOpen.set(false);
    this.onTouched();
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm.set(target.value);
    this.highlightedIndex.set(-1);
  }

  onKeydown(event: KeyboardEvent): void {
    const opts = this.filteredOptions();

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen()) {
          this.isOpen.set(true);
          this.highlightedIndex.set(0);
        } else {
          this.highlightedIndex.update(i => {
            let next = i + 1;
            while (next < opts.length && opts[next].disabled) next++;
            return next < opts.length ? next : i;
          });
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.highlightedIndex.update(i => {
          let prev = i - 1;
          while (prev >= 0 && opts[prev].disabled) prev--;
          return prev >= 0 ? prev : i;
        });
        break;
      case 'Enter':
        event.preventDefault();
        if (this.isOpen() && this.highlightedIndex() >= 0) {
          const opt = opts[this.highlightedIndex()];
          if (opt && !opt.disabled) this.selectOption(opt);
        } else {
          this.toggle();
        }
        break;
      case 'Escape':
        event.preventDefault();
        this.isOpen.set(false);
        this.onTouched();
        break;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      if (this.isOpen()) {
        this.isOpen.set(false);
        this.onTouched();
      }
    }
  }

  isSelected(option: DgaSelectOption): boolean {
    return this.value() === option.value;
  }
}
