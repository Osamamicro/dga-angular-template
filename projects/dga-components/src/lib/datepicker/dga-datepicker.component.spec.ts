import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DgaDatepickerComponent } from './dga-datepicker.component';

@Component({
  standalone: true,
  imports: [DgaDatepickerComponent],
  template: `
    <dga-datepicker
      [placeholder]="placeholder()"
      [disabled]="disabled()"
      [label]="label()"
      (dateChange)="onDateChange($event)"
    ></dga-datepicker>
  `,
})
class TestHostComponent {
  placeholder = signal('Select date');
  disabled = signal(false);
  label = signal('Date');
  selectedDate: Date | null = null;

  onDateChange(date: Date | null): void {
    this.selectedDate = date;
  }
}

describe('DgaDatepickerComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  function getInput(): HTMLInputElement {
    return fixture.nativeElement.querySelector('.dga-datepicker__input');
  }

  function getToggle(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('.dga-datepicker__toggle');
  }

  function getCalendar(): HTMLElement | null {
    return fixture.nativeElement.querySelector('.dga-datepicker__calendar');
  }

  function getDayButtons(): HTMLButtonElement[] {
    return Array.from(
      fixture.nativeElement.querySelectorAll('.dga-datepicker__day')
    );
  }

  it('should create the datepicker', () => {
    expect(getInput()).toBeTruthy();
    expect(getToggle()).toBeTruthy();
  });

  it('should render label', () => {
    const label = fixture.nativeElement.querySelector('.dga-datepicker__label');
    expect(label.textContent).toContain('Date');
  });

  it('should show placeholder', () => {
    expect(getInput().placeholder).toBe('Select date');
  });

  it('should not show calendar initially', () => {
    expect(getCalendar()).toBeNull();
  });

  it('should open calendar on input click', () => {
    getInput().click();
    fixture.detectChanges();

    expect(getCalendar()).toBeTruthy();
  });

  it('should open calendar on toggle button click', () => {
    getToggle().click();
    fixture.detectChanges();

    expect(getCalendar()).toBeTruthy();
  });

  it('should have role="dialog" on calendar', () => {
    getInput().click();
    fixture.detectChanges();

    expect(getCalendar()!.getAttribute('role')).toBe('dialog');
    expect(getCalendar()!.getAttribute('aria-modal')).toBe('true');
  });

  it('should set aria-expanded on input', () => {
    expect(getInput().getAttribute('aria-expanded')).toBe('false');

    getInput().click();
    fixture.detectChanges();

    expect(getInput().getAttribute('aria-expanded')).toBe('true');
  });

  it('should render weekday headers', () => {
    getInput().click();
    fixture.detectChanges();

    const headers = fixture.nativeElement.querySelectorAll('.dga-datepicker__weekday');
    expect(headers.length).toBe(7);
  });

  it('should render day buttons in the grid', () => {
    getInput().click();
    fixture.detectChanges();

    const days = getDayButtons();
    expect(days.length).toBeGreaterThan(27); // At least 28 days
    expect(days.length).toBeLessThanOrEqual(31);
  });

  it('should select a date and close calendar', () => {
    getInput().click();
    fixture.detectChanges();

    const days = getDayButtons();
    days[14].click(); // Click a middle day
    fixture.detectChanges();

    expect(host.selectedDate).toBeTruthy();
    expect(getCalendar()).toBeNull();
  });

  it('should navigate to previous month', () => {
    getInput().click();
    fixture.detectChanges();

    const monthLabel = fixture.nativeElement.querySelector('.dga-datepicker__month-label');
    const initialLabel = monthLabel.textContent;

    const prevBtn = fixture.nativeElement.querySelector('[aria-label="Previous month"]');
    prevBtn.click();
    fixture.detectChanges();

    expect(monthLabel.textContent).not.toBe(initialLabel);
  });

  it('should navigate to next month', () => {
    getInput().click();
    fixture.detectChanges();

    const monthLabel = fixture.nativeElement.querySelector('.dga-datepicker__month-label');
    const initialLabel = monthLabel.textContent;

    const nextBtn = fixture.nativeElement.querySelector('[aria-label="Next month"]');
    nextBtn.click();
    fixture.detectChanges();

    expect(monthLabel.textContent).not.toBe(initialLabel);
  });

  it('should apply disabled state', () => {
    host.disabled.set(true);
    fixture.detectChanges();

    expect(getInput().disabled).toBe(true);
    expect(getToggle().disabled).toBe(true);
  });

  it('should not open when disabled', () => {
    host.disabled.set(true);
    fixture.detectChanges();

    getInput().click();
    fixture.detectChanges();

    expect(getCalendar()).toBeNull();
  });

  it('should have toggle button with aria-label', () => {
    expect(getToggle().getAttribute('aria-label')).toBe('Open calendar');
  });
});
