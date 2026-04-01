import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
  forwardRef,
  inject,
  OnDestroy,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { DOCUMENT } from '@angular/common';

const DAYS_IN_WEEK = 7;
const WEEKDAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

let nextId = 0;

@Component({
  selector: 'dga-datepicker',
  standalone: true,
  templateUrl: './dga-datepicker.component.html',
  styleUrls: ['./dga-datepicker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DgaDatepickerComponent),
      multi: true,
    },
  ],
})
export class DgaDatepickerComponent implements ControlValueAccessor, OnDestroy {
  private readonly document = inject(DOCUMENT);

  /** Placeholder text */
  placeholder = input<string>('Select date');

  /** Minimum selectable date */
  minDate = input<Date | null>(null);

  /** Maximum selectable date */
  maxDate = input<Date | null>(null);

  /** Whether the datepicker is disabled */
  disabled = input<boolean>(false);

  /** Label text */
  label = input<string>('');

  /** Emits when the date changes */
  dateChange = output<Date | null>();

  /** Unique ID */
  readonly datepickerId = `dga-datepicker-${nextId++}`;

  /** Whether the calendar popup is open */
  isOpen = signal(false);

  /** Currently selected date */
  selectedDate = signal<Date | null>(null);

  /** The month/year being viewed */
  viewDate = signal(new Date());

  /** Weekday header labels */
  readonly weekdays = WEEKDAY_LABELS;

  /** Current view month name */
  viewMonthLabel = computed(() => {
    const d = this.viewDate();
    return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  });

  /** Calendar grid: array of weeks, each week is array of dates (null for empty cells) */
  calendarGrid = computed(() => {
    const view = this.viewDate();
    const year = view.getFullYear();
    const month = view.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const startOffset = firstDay.getDay();
    const totalDays = lastDay.getDate();

    const grid: (Date | null)[][] = [];
    let week: (Date | null)[] = [];

    // Leading empty cells
    for (let i = 0; i < startOffset; i++) {
      week.push(null);
    }

    for (let day = 1; day <= totalDays; day++) {
      week.push(new Date(year, month, day));
      if (week.length === DAYS_IN_WEEK) {
        grid.push(week);
        week = [];
      }
    }

    // Trailing empty cells
    if (week.length > 0) {
      while (week.length < DAYS_IN_WEEK) {
        week.push(null);
      }
      grid.push(week);
    }

    return grid;
  });

  /** Display value for the input */
  displayValue = computed(() => {
    const date = this.selectedDate();
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  });

  private onChange: (value: Date | null) => void = () => {};
  private onTouched: () => void = () => {};
  private isDisabledCva = false;

  private outsideClickHandler = (event: MouseEvent) => {
    const target = event.target as Node;
    const host = this.document.getElementById(this.datepickerId);
    if (host && !host.contains(target)) {
      this.isOpen.set(false);
    }
  };

  private keydownHandler = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.isOpen.set(false);
    }
  };

  ngOnDestroy(): void {
    this.removeListeners();
  }

  /** Toggle calendar popup */
  toggleCalendar(): void {
    if (this.disabled() || this.isDisabledCva) return;
    const next = !this.isOpen();
    this.isOpen.set(next);
    if (next) {
      this.addListeners();
      // Set view to selected date or today
      const sel = this.selectedDate();
      this.viewDate.set(sel ? new Date(sel) : new Date());
    } else {
      this.removeListeners();
    }
  }

  /** Select a date */
  selectDate(date: Date): void {
    if (this.isDateDisabled(date)) return;
    this.selectedDate.set(date);
    this.isOpen.set(false);
    this.removeListeners();
    this.onChange(date);
    this.onTouched();
    this.dateChange.emit(date);
  }

  /** Navigate to previous month */
  prevMonth(): void {
    this.viewDate.update((d) => {
      const next = new Date(d);
      next.setMonth(next.getMonth() - 1);
      return next;
    });
  }

  /** Navigate to next month */
  nextMonth(): void {
    this.viewDate.update((d) => {
      const next = new Date(d);
      next.setMonth(next.getMonth() + 1);
      return next;
    });
  }

  /** Check if a date matches the selected date */
  isSelected(date: Date): boolean {
    const sel = this.selectedDate();
    if (!sel) return false;
    return (
      sel.getFullYear() === date.getFullYear() &&
      sel.getMonth() === date.getMonth() &&
      sel.getDate() === date.getDate()
    );
  }

  /** Check if a date is today */
  isToday(date: Date): boolean {
    const today = new Date();
    return (
      today.getFullYear() === date.getFullYear() &&
      today.getMonth() === date.getMonth() &&
      today.getDate() === date.getDate()
    );
  }

  /** Check if a date is disabled */
  isDateDisabled(date: Date): boolean {
    const min = this.minDate();
    const max = this.maxDate();
    if (min && date < min) return true;
    if (max && date > max) return true;
    return false;
  }

  // ControlValueAccessor
  writeValue(value: Date | null): void {
    this.selectedDate.set(value);
  }

  registerOnChange(fn: (value: Date | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabledCva = isDisabled;
  }

  private addListeners(): void {
    setTimeout(() => {
      this.document.addEventListener('click', this.outsideClickHandler);
      this.document.addEventListener('keydown', this.keydownHandler);
    });
  }

  private removeListeners(): void {
    this.document.removeEventListener('click', this.outsideClickHandler);
    this.document.removeEventListener('keydown', this.keydownHandler);
  }
}
