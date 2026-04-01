import { vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DgaAlertComponent } from './dga-alert.component';

describe('DgaAlertComponent', () => {
  let component: DgaAlertComponent;
  let fixture: ComponentFixture<DgaAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DgaAlertComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DgaAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply correct severity classes', () => {
    const alertEl = fixture.nativeElement.querySelector('.dga-alert');
    expect(alertEl.classList.contains('dga-alert--info')).toBe(true);

    fixture.componentRef.setInput('severity', 'error');
    fixture.detectChanges();

    const updatedAlertEl = fixture.nativeElement.querySelector('.dga-alert');
    expect(updatedAlertEl.classList.contains('dga-alert--error')).toBe(true);
    expect(updatedAlertEl.classList.contains('dga-alert--info')).toBe(false);
  });

  it('should set correct role and aria-live for error/warning severity', () => {
    fixture.componentRef.setInput('severity', 'error');
    fixture.detectChanges();

    const alertEl = fixture.nativeElement.querySelector('.dga-alert');
    expect(alertEl.getAttribute('role')).toBe('alert');
    expect(alertEl.getAttribute('aria-live')).toBe('assertive');
  });

  it('should set correct role and aria-live for info/success severity', () => {
    const alertEl = fixture.nativeElement.querySelector('.dga-alert');
    expect(alertEl.getAttribute('role')).toBe('status');
    expect(alertEl.getAttribute('aria-live')).toBe('polite');
  });

  it('should show dismiss button when dismissible', () => {
    let dismissBtn = fixture.nativeElement.querySelector('.dga-alert__dismiss');
    expect(dismissBtn).toBeFalsy();

    fixture.componentRef.setInput('dismissible', true);
    fixture.detectChanges();

    dismissBtn = fixture.nativeElement.querySelector('.dga-alert__dismiss');
    expect(dismissBtn).toBeTruthy();
  });

  it('should emit dismissed event and hide when dismiss is clicked', () => {
    fixture.componentRef.setInput('dismissible', true);
    fixture.detectChanges();

    const emitSpy = vi.spyOn(component.dismissed, 'emit');
    const dismissBtn = fixture.nativeElement.querySelector('.dga-alert__dismiss');
    dismissBtn.click();
    fixture.detectChanges();

    expect(emitSpy).toHaveBeenCalled();
    expect(component.visible()).toBe(false);

    const alertEl = fixture.nativeElement.querySelector('.dga-alert');
    expect(alertEl).toBeFalsy();
  });

  it('should auto-dismiss after the specified timeout', () => {
    vi.useFakeTimers();

    // Re-create to trigger ngOnInit with autoDismiss set
    fixture = TestBed.createComponent(DgaAlertComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('autoDismiss', 5000);
    fixture.detectChanges();

    const emitSpy = vi.spyOn(component.dismissed, 'emit');
    expect(component.visible()).toBe(true);

    vi.advanceTimersByTime(5000);
    fixture.detectChanges();

    expect(component.visible()).toBe(false);
    expect(emitSpy).toHaveBeenCalled();

    vi.useRealTimers();
  });

  it('should toggle visibility via the visible signal', () => {
    expect(component.visible()).toBe(true);
    let alertEl = fixture.nativeElement.querySelector('.dga-alert');
    expect(alertEl).toBeTruthy();

    component.visible.set(false);
    fixture.detectChanges();

    alertEl = fixture.nativeElement.querySelector('.dga-alert');
    expect(alertEl).toBeFalsy();
  });
});
