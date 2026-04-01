import { vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DgaSelectComponent, DgaSelectOption } from './dga-select.component';

describe('DgaSelectComponent', () => {
  let component: DgaSelectComponent;
  let fixture: ComponentFixture<DgaSelectComponent>;

  const mockOptions: DgaSelectOption[] = [
    { value: 1, label: 'Option 1' },
    { value: 2, label: 'Option 2' },
    { value: 3, label: 'Option 3', disabled: true },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DgaSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DgaSelectComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('options', mockOptions);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should open dropdown on trigger click', () => {
    const trigger = fixture.nativeElement.querySelector('.dga-select__trigger');
    trigger.click();
    fixture.detectChanges();

    expect(component.isOpen()).toBe(true);
    const dropdown = fixture.nativeElement.querySelector('.dga-select__dropdown');
    expect(dropdown).toBeTruthy();
  });

  it('should close dropdown on second click', () => {
    component.toggle();
    fixture.detectChanges();
    expect(component.isOpen()).toBe(true);

    component.toggle();
    fixture.detectChanges();
    expect(component.isOpen()).toBe(false);
  });

  it('should select an option', () => {
    const spy = vi.fn();
    component.registerOnChange(spy);

    component.toggle();
    fixture.detectChanges();

    component.selectOption(mockOptions[1]);
    fixture.detectChanges();

    expect(component.value()).toBe(2);
    expect(spy).toHaveBeenCalledWith(2);
    expect(component.isOpen()).toBe(false);
  });

  it('should not select a disabled option', () => {
    const spy = vi.fn();
    component.registerOnChange(spy);

    component.selectOption(mockOptions[2]);
    fixture.detectChanges();

    expect(spy).not.toHaveBeenCalled();
  });

  it('should navigate with keyboard ArrowDown', () => {
    component.toggle();
    fixture.detectChanges();

    const selectEl = fixture.nativeElement.querySelector('.dga-select');
    selectEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    fixture.detectChanges();

    expect(component.highlightedIndex()).toBe(0);
  });

  it('should close on Escape key', () => {
    component.toggle();
    fixture.detectChanges();

    component.onKeydown(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();

    expect(component.isOpen()).toBe(false);
  });

  it('should filter options when searchable', () => {
    fixture.componentRef.setInput('searchable', true);
    fixture.detectChanges();

    component.toggle();
    fixture.detectChanges();

    component.searchTerm.set('Option 1');
    fixture.detectChanges();

    expect(component.filteredOptions().length).toBe(1);
    expect(component.filteredOptions()[0].label).toBe('Option 1');
  });

  it('should have correct ARIA attributes on trigger', () => {
    const trigger = fixture.nativeElement.querySelector('.dga-select__trigger');
    expect(trigger.getAttribute('role')).toBe('combobox');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(trigger.getAttribute('aria-haspopup')).toBe('listbox');
  });

  it('should be disabled when disabled input is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const trigger: HTMLButtonElement = fixture.nativeElement.querySelector('.dga-select__trigger');
    expect(trigger.disabled).toBe(true);
  });

  it('should display the selected option label', () => {
    component.writeValue(1);
    fixture.detectChanges();

    expect(component.displayValue()).toBe('Option 1');
  });

  it('should display error message', () => {
    fixture.componentRef.setInput('errorMessage', 'Selection required');
    fixture.detectChanges();

    const error = fixture.nativeElement.querySelector('.dga-select__error');
    expect(error).toBeTruthy();
    expect(error.textContent).toContain('Selection required');
  });
});
