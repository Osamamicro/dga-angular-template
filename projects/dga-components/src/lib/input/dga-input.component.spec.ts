import { vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DgaInputComponent } from './dga-input.component';

// Test host component for CVA testing
@Component({
  standalone: true,
  imports: [DgaInputComponent, ReactiveFormsModule],
  template: `<dga-input [formControl]="control" />`,
})
class TestHostComponent {
  control = new FormControl('');
}

describe('DgaInputComponent', () => {
  let component: DgaInputComponent;
  let fixture: ComponentFixture<DgaInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DgaInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DgaInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render label when provided', () => {
    fixture.componentRef.setInput('label', 'Full Name');
    fixture.detectChanges();

    const label = fixture.debugElement.query(By.css('.dga-input__label'));
    expect(label).toBeTruthy();
    expect(label.nativeElement.textContent).toContain('Full Name');
  });

  it('should not render label when not provided', () => {
    const label = fixture.debugElement.query(By.css('.dga-input__label'));
    expect(label).toBeNull();
  });

  it('should show error message', () => {
    fixture.componentRef.setInput('errorMessage', 'This field is required');
    fixture.detectChanges();

    const error = fixture.debugElement.query(By.css('.dga-input__error-message'));
    expect(error).toBeTruthy();
    expect(error.nativeElement.textContent).toContain('This field is required');
    expect(error.nativeElement.getAttribute('role')).toBe('alert');
  });

  it('should show helper text when no error', () => {
    fixture.componentRef.setInput('helperText', 'Enter your full name');
    fixture.detectChanges();

    const helper = fixture.debugElement.query(By.css('.dga-input__helper-text'));
    expect(helper).toBeTruthy();
    expect(helper.nativeElement.textContent).toContain('Enter your full name');
  });

  it('should hide helper text when error is shown', () => {
    fixture.componentRef.setInput('helperText', 'Enter your full name');
    fixture.componentRef.setInput('errorMessage', 'Required');
    fixture.detectChanges();

    const helper = fixture.debugElement.query(By.css('.dga-input__helper-text'));
    const error = fixture.debugElement.query(By.css('.dga-input__error-message'));

    expect(helper).toBeNull();
    expect(error).toBeTruthy();
  });

  it('should apply size classes', () => {
    fixture.componentRef.setInput('size', 'sm');
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('input'));
    expect(input.nativeElement.classList).toContain('dga-input--sm');
  });

  it('should apply medium size class', () => {
    fixture.componentRef.setInput('size', 'md');
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('input'));
    expect(input.nativeElement.classList).toContain('dga-input--md');
  });

  it('should apply large size class by default', () => {
    const input = fixture.debugElement.query(By.css('input'));
    expect(input.nativeElement.classList).toContain('dga-input--lg');
  });

  it('should have correct ARIA attributes when required', () => {
    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('input'));
    expect(input.nativeElement.getAttribute('aria-required')).toBe('true');
  });

  it('should have aria-invalid when error message is set', () => {
    fixture.componentRef.setInput('errorMessage', 'Error');
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('input'));
    expect(input.nativeElement.getAttribute('aria-invalid')).toBe('true');
  });

  it('should not have aria-invalid when no error', () => {
    const input = fixture.debugElement.query(By.css('input'));
    expect(input.nativeElement.getAttribute('aria-invalid')).toBeNull();
  });

  it('should set aria-describedby to error ID when error exists', () => {
    fixture.componentRef.setInput('errorMessage', 'Error');
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('input'));
    const errorId = `${component.inputId}-error`;
    expect(input.nativeElement.getAttribute('aria-describedby')).toBe(errorId);
  });

  it('should set aria-describedby to helper ID when helper text exists', () => {
    fixture.componentRef.setInput('helperText', 'Help');
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('input'));
    const helperId = `${component.inputId}-helper`;
    expect(input.nativeElement.getAttribute('aria-describedby')).toBe(helperId);
  });

  it('should be disabled when disabled input is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('input'));
    expect(input.nativeElement.disabled).toBe(true);
  });

  it('should be readonly when readonly input is true', () => {
    fixture.componentRef.setInput('readonly', true);
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('input'));
    expect(input.nativeElement.readOnly).toBe(true);
  });

  it('should show character count when maxLength is set', () => {
    fixture.componentRef.setInput('maxLength', 100);
    fixture.detectChanges();

    const count = fixture.debugElement.query(By.css('.dga-input__character-count'));
    expect(count).toBeTruthy();
    expect(count.nativeElement.textContent).toContain('0/100');
  });

  it('should update character count on input', () => {
    fixture.componentRef.setInput('maxLength', 50);
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('input'));
    input.nativeElement.value = 'Hello';
    input.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const count = fixture.debugElement.query(By.css('.dga-input__character-count'));
    expect(count.nativeElement.textContent).toContain('5/50');
  });

  it('should show required asterisk when required', () => {
    fixture.componentRef.setInput('label', 'Name');
    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();

    const asterisk = fixture.debugElement.query(By.css('.dga-input__required'));
    expect(asterisk).toBeTruthy();
    expect(asterisk.nativeElement.textContent).toContain('*');
    expect(asterisk.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('should link label to input via for/id', () => {
    fixture.componentRef.setInput('label', 'Email');
    fixture.detectChanges();

    const label = fixture.debugElement.query(By.css('label'));
    const input = fixture.debugElement.query(By.css('input'));
    expect(label.nativeElement.getAttribute('for')).toBe(input.nativeElement.id);
  });

  describe('ControlValueAccessor', () => {
    let hostFixture: ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;

    beforeEach(async () => {
      TestBed.resetTestingModule();
      await TestBed.configureTestingModule({
        imports: [TestHostComponent],
      }).compileComponents();

      hostFixture = TestBed.createComponent(TestHostComponent);
      hostComponent = hostFixture.componentInstance;
      hostFixture.detectChanges();
    });

    it('should bind value via FormControl', () => {
      hostComponent.control.setValue('test value');
      hostFixture.detectChanges();

      const input = hostFixture.debugElement.query(By.css('input'));
      expect(input.nativeElement.value).toBe('test value');
    });

    it('should propagate input changes to FormControl', () => {
      const input = hostFixture.debugElement.query(By.css('input'));
      input.nativeElement.value = 'typed value';
      input.nativeElement.dispatchEvent(new Event('input'));
      hostFixture.detectChanges();

      expect(hostComponent.control.value).toBe('typed value');
    });

    it('should disable input when FormControl is disabled', () => {
      hostComponent.control.disable();
      hostFixture.detectChanges();

      const input = hostFixture.debugElement.query(By.css('input'));
      expect(input.nativeElement.disabled).toBe(true);
    });

    it('should handle null value from FormControl', () => {
      hostComponent.control.setValue(null);
      hostFixture.detectChanges();

      const input = hostFixture.debugElement.query(By.css('input'));
      expect(input.nativeElement.value).toBe('');
    });
  });
});
