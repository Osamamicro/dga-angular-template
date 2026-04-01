import { vi } from 'vitest';
import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DgaStepperComponent } from './dga-stepper.component';
import { DgaStepComponent } from './dga-step.component';

@Component({
  standalone: true,
  imports: [DgaStepperComponent, DgaStepComponent],
  template: `
    <dga-stepper
      [activeStep]="activeStep()"
      [orientation]="orientation()"
      [clickable]="clickable()"
      (stepChange)="onStepChange($event)"
    >
      <dga-step label="Step 1" description="First step"></dga-step>
      <dga-step label="Step 2" description="Second step"></dga-step>
      <dga-step label="Step 3"></dga-step>
    </dga-stepper>
  `,
})
class TestHostComponent {
  activeStep = signal(0);
  orientation = signal<'horizontal' | 'vertical'>('horizontal');
  clickable = signal(false);
  lastStepChange = -1;

  onStepChange(index: number): void {
    this.lastStepChange = index;
  }
}

describe('DgaStepperComponent', () => {
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

  function getSteps(): HTMLElement[] {
    return Array.from(
      fixture.nativeElement.querySelectorAll('.dga-stepper__step')
    );
  }

  function getIndicators(): HTMLElement[] {
    return Array.from(
      fixture.nativeElement.querySelectorAll('.dga-stepper__indicator')
    );
  }

  it('should create the stepper', () => {
    const stepper = fixture.nativeElement.querySelector('.dga-stepper');
    expect(stepper).toBeTruthy();
  });

  it('should render all steps', () => {
    expect(getSteps().length).toBe(3);
  });

  it('should have role="list" on container', () => {
    const stepper = fixture.nativeElement.querySelector('.dga-stepper');
    expect(stepper.getAttribute('role')).toBe('list');
  });

  it('should have role="listitem" on each step', () => {
    const steps = getSteps();
    steps.forEach((step) => {
      expect(step.getAttribute('role')).toBe('listitem');
    });
  });

  it('should mark the first step as current', () => {
    const steps = getSteps();
    expect(steps[0].classList.contains('dga-stepper__step--current')).toBe(true);
    expect(steps[0].getAttribute('aria-current')).toBe('step');
  });

  it('should mark subsequent steps as upcoming', () => {
    const steps = getSteps();
    expect(steps[1].classList.contains('dga-stepper__step--upcoming')).toBe(true);
    expect(steps[2].classList.contains('dga-stepper__step--upcoming')).toBe(true);
  });

  it('should mark previous steps as completed when activeStep advances', () => {
    host.activeStep.set(2);
    fixture.detectChanges();

    const steps = getSteps();
    expect(steps[0].classList.contains('dga-stepper__step--completed')).toBe(true);
    expect(steps[1].classList.contains('dga-stepper__step--completed')).toBe(true);
    expect(steps[2].classList.contains('dga-stepper__step--current')).toBe(true);
  });

  it('should show checkmark for completed steps', () => {
    host.activeStep.set(1);
    fixture.detectChanges();

    const firstIndicator = getIndicators()[0];
    const check = firstIndicator.querySelector('.dga-stepper__check');
    expect(check).toBeTruthy();
  });

  it('should show number for current and upcoming steps', () => {
    const indicators = getIndicators();
    expect(indicators[0].querySelector('.dga-stepper__number')?.textContent?.trim()).toBe('1');
    expect(indicators[1].querySelector('.dga-stepper__number')?.textContent?.trim()).toBe('2');
  });

  it('should render step labels', () => {
    const labels = fixture.nativeElement.querySelectorAll('.dga-stepper__label');
    expect(labels[0].textContent).toContain('Step 1');
    expect(labels[1].textContent).toContain('Step 2');
  });

  it('should render step descriptions when provided', () => {
    const descriptions = fixture.nativeElement.querySelectorAll(
      '.dga-stepper__description'
    );
    expect(descriptions.length).toBe(2); // Step 3 has no description
    expect(descriptions[0].textContent).toContain('First step');
  });

  it('should apply horizontal orientation by default', () => {
    const stepper = fixture.nativeElement.querySelector('.dga-stepper');
    expect(stepper.classList.contains('dga-stepper--horizontal')).toBe(true);
  });

  it('should switch to vertical orientation', () => {
    host.orientation.set('vertical');
    fixture.detectChanges();

    const stepper = fixture.nativeElement.querySelector('.dga-stepper');
    expect(stepper.classList.contains('dga-stepper--vertical')).toBe(true);
  });

  it('should emit stepChange when clickable and clicked', () => {
    host.clickable.set(true);
    fixture.detectChanges();

    const steps = getSteps();
    steps[1].click();
    fixture.detectChanges();

    expect(host.lastStepChange).toBe(1);
  });

  it('should not emit stepChange when not clickable', () => {
    const steps = getSteps();
    steps[1].click();
    fixture.detectChanges();

    expect(host.lastStepChange).toBe(-1);
  });

  it('should render connectors between steps', () => {
    const connectors = fixture.nativeElement.querySelectorAll(
      '.dga-stepper__connector'
    );
    expect(connectors.length).toBe(2); // 3 steps = 2 connectors
  });
});
