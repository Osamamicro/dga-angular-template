import { vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DgaSwitchComponent } from './dga-switch.component';

describe('DgaSwitchComponent', () => {
  let component: DgaSwitchComponent;
  let fixture: ComponentFixture<DgaSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DgaSwitchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DgaSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle checked state', () => {
    expect(component.checked()).toBe(false);

    component.toggle();
    fixture.detectChanges();

    expect(component.checked()).toBe(true);

    component.toggle();
    fixture.detectChanges();

    expect(component.checked()).toBe(false);
  });

  it('should display label text', () => {
    fixture.componentRef.setInput('label', 'Enable notifications');
    fixture.detectChanges();

    const label = fixture.nativeElement.querySelector('.dga-switch__label');
    expect(label).toBeTruthy();
    expect(label.textContent).toContain('Enable notifications');
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

  it('should have role="switch" on the button', () => {
    const button = fixture.nativeElement.querySelector('.dga-switch__track');
    expect(button.getAttribute('role')).toBe('switch');
  });

  it('should set aria-checked correctly', () => {
    const button = fixture.nativeElement.querySelector('.dga-switch__track');
    expect(button.getAttribute('aria-checked')).toBe('false');

    component.toggle();
    fixture.detectChanges();

    const updatedButton = fixture.nativeElement.querySelector('.dga-switch__track');
    expect(updatedButton.getAttribute('aria-checked')).toBe('true');
  });

  it('should disable the button when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('.dga-switch__track');
    expect(button.disabled).toBe(true);
  });

  it('should apply checked class', () => {
    component.toggle();
    fixture.detectChanges();

    const wrapper = fixture.nativeElement.querySelector('.dga-switch');
    expect(wrapper.classList).toContain('dga-switch--checked');
  });
});
