import { vi } from 'vitest';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DgaRadioGroupComponent } from './dga-radio-group.component';
import { DgaRadioComponent } from './dga-radio.component';

// Test host component to provide radio group context
@Component({
  standalone: true,
  imports: [DgaRadioGroupComponent, DgaRadioComponent],
  template: `
    <dga-radio-group [name]="'test-group'" [disabled]="groupDisabled">
      <dga-radio [value]="'a'" [label]="'Option A'" />
      <dga-radio [value]="'b'" [label]="'Option B'" />
      <dga-radio [value]="'c'" [label]="'Option C'" [disabled]="true" />
    </dga-radio-group>
  `,
})
class TestHostComponent {
  groupDisabled = false;
}

describe('DgaRadioGroup & DgaRadio', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the radio group with radios', () => {
    const radios = fixture.nativeElement.querySelectorAll('dga-radio');
    expect(radios.length).toBe(3);
  });

  it('should select a radio on click', () => {
    const radioLabels = fixture.nativeElement.querySelectorAll('.dga-radio');
    const radioInputs: HTMLInputElement[] = fixture.nativeElement.querySelectorAll('.dga-radio__input');

    radioInputs[0].click();
    fixture.detectChanges();

    expect(radioInputs[0].checked).toBe(true);
    expect(radioLabels[0].classList).toContain('dga-radio--selected');
  });

  it('should switch selection between radios', () => {
    const radioInputs: HTMLInputElement[] = fixture.nativeElement.querySelectorAll('.dga-radio__input');

    radioInputs[0].click();
    fixture.detectChanges();
    expect(radioInputs[0].checked).toBe(true);

    radioInputs[1].click();
    fixture.detectChanges();
    expect(radioInputs[1].checked).toBe(true);
    expect(radioInputs[0].checked).toBe(false);
  });

  it('should have correct ARIA attributes', () => {
    const group = fixture.nativeElement.querySelector('.dga-radio-group');
    expect(group.getAttribute('role')).toBe('radiogroup');

    const radioInputs: HTMLInputElement[] = fixture.nativeElement.querySelectorAll('.dga-radio__input');
    expect(radioInputs[0].getAttribute('aria-checked')).toBe('false');

    radioInputs[0].click();
    fixture.detectChanges();

    const updatedInputs: HTMLInputElement[] = fixture.nativeElement.querySelectorAll('.dga-radio__input');
    expect(updatedInputs[0].getAttribute('aria-checked')).toBe('true');
  });

  it('should disable individual radio', () => {
    const radioInputs: HTMLInputElement[] = fixture.nativeElement.querySelectorAll('.dga-radio__input');
    expect(radioInputs[2].disabled).toBe(true);

    const radioLabels = fixture.nativeElement.querySelectorAll('.dga-radio');
    expect(radioLabels[2].classList).toContain('dga-radio--disabled');
  });

  it('should bind value via ControlValueAccessor', () => {
    const group: DgaRadioGroupComponent = fixture.debugElement
      .children[0].componentInstance;

    group.writeValue('b');
    fixture.detectChanges();

    expect(group.value()).toBe('b');
    const radioInputs: HTMLInputElement[] = fixture.nativeElement.querySelectorAll('.dga-radio__input');
    expect(radioInputs[1].checked).toBe(true);
  });

  it('should call onChange when selection changes', () => {
    const group: DgaRadioGroupComponent = fixture.debugElement
      .children[0].componentInstance;
    const spy = vi.fn();
    group.registerOnChange(spy);

    const radioInputs: HTMLInputElement[] = fixture.nativeElement.querySelectorAll('.dga-radio__input');
    radioInputs[0].click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith('a');
  });
});
