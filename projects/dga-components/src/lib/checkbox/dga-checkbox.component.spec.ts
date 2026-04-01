import { vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DgaCheckboxComponent } from './dga-checkbox.component';

describe('DgaCheckboxComponent', () => {
  let component: DgaCheckboxComponent;
  let fixture: ComponentFixture<DgaCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DgaCheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DgaCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle checked state on click', () => {
    expect(component.checked()).toBe(false);

    component.toggle();
    fixture.detectChanges();

    expect(component.checked()).toBe(true);

    component.toggle();
    fixture.detectChanges();

    expect(component.checked()).toBe(false);
  });

  it('should display label text', () => {
    fixture.componentRef.setInput('label', 'Accept terms');
    fixture.detectChanges();

    const label = fixture.nativeElement.querySelector('.dga-checkbox__label');
    expect(label).toBeTruthy();
    expect(label.textContent).toContain('Accept terms');
  });

  it('should apply indeterminate state', () => {
    fixture.componentRef.setInput('indeterminate', true);
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('.dga-checkbox__input');
    expect(input.indeterminate).toBe(true);
    expect(input.getAttribute('aria-checked')).toBe('mixed');
  });

  it('should bind value through ControlValueAccessor', () => {
    component.writeValue(true);
    fixture.detectChanges();

    expect(component.checked()).toBe(true);
  });

  it('should call onChange when toggled', () => {
    const spy = vi.fn();
    component.registerOnChange(spy);

    component.toggle();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should not toggle when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    component.toggle();
    fixture.detectChanges();

    expect(component.checked()).toBe(false);
  });

  it('should have correct ARIA attributes', () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('.dga-checkbox__input');
    expect(input.getAttribute('aria-checked')).toBe('false');

    component.writeValue(true);
    fixture.detectChanges();

    const updatedInput: HTMLInputElement = fixture.nativeElement.querySelector('.dga-checkbox__input');
    expect(updatedInput.getAttribute('aria-checked')).toBe('true');
  });

  it('should apply disabled class', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const wrapper = fixture.nativeElement.querySelector('.dga-checkbox');
    expect(wrapper.classList).toContain('dga-checkbox--disabled');
  });
});
