import { vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DgaTextareaComponent } from './dga-textarea.component';

describe('DgaTextareaComponent', () => {
  let component: DgaTextareaComponent;
  let fixture: ComponentFixture<DgaTextareaComponent>;
  let textareaElement: HTMLTextAreaElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DgaTextareaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DgaTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    textareaElement = fixture.nativeElement.querySelector('textarea');
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the label when provided', () => {
    fixture.componentRef.setInput('label', 'Description');
    fixture.detectChanges();

    const label = fixture.nativeElement.querySelector('.dga-textarea__label');
    expect(label).toBeTruthy();
    expect(label.textContent).toContain('Description');
  });

  it('should bind value through ControlValueAccessor', () => {
    component.writeValue('Hello World');
    fixture.detectChanges();

    expect(component.value()).toBe('Hello World');
    expect(textareaElement.value).toBe('Hello World');
  });

  it('should call onChange when user types', () => {
    const spy = vi.fn();
    component.registerOnChange(spy);

    textareaElement.value = 'Test input';
    textareaElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith('Test input');
  });

  it('should display error message', () => {
    fixture.componentRef.setInput('errorMessage', 'Field is required');
    fixture.detectChanges();

    const error = fixture.nativeElement.querySelector('.dga-textarea__error');
    expect(error).toBeTruthy();
    expect(error.textContent).toContain('Field is required');
  });

  it('should display helper text when no error', () => {
    fixture.componentRef.setInput('helperText', 'Enter your description');
    fixture.detectChanges();

    const helper = fixture.nativeElement.querySelector('.dga-textarea__helper');
    expect(helper).toBeTruthy();
    expect(helper.textContent).toContain('Enter your description');
  });

  it('should hide helper text when error is present', () => {
    fixture.componentRef.setInput('helperText', 'Enter your description');
    fixture.componentRef.setInput('errorMessage', 'Required');
    fixture.detectChanges();

    const helper = fixture.nativeElement.querySelector('.dga-textarea__helper');
    expect(helper).toBeFalsy();
  });

  it('should set aria-invalid when error message is provided', () => {
    fixture.componentRef.setInput('errorMessage', 'Invalid');
    fixture.detectChanges();
    textareaElement = fixture.nativeElement.querySelector('textarea');

    expect(textareaElement.getAttribute('aria-invalid')).toBe('true');
  });

  it('should set aria-required when required', () => {
    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();
    textareaElement = fixture.nativeElement.querySelector('textarea');

    expect(textareaElement.getAttribute('aria-required')).toBe('true');
  });

  it('should be disabled when disabled input is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    textareaElement = fixture.nativeElement.querySelector('textarea');

    expect(textareaElement.disabled).toBe(true);
  });

  it('should show character count when maxLength is set', () => {
    fixture.componentRef.setInput('maxLength', 100);
    fixture.detectChanges();

    const count = fixture.nativeElement.querySelector('.dga-textarea__count');
    expect(count).toBeTruthy();
    expect(count.textContent).toContain('0/100');
  });

  it('should call onTouched on blur', () => {
    const spy = vi.fn();
    component.registerOnTouched(spy);

    textareaElement.dispatchEvent(new Event('blur'));
    expect(spy).toHaveBeenCalled();
  });
});
