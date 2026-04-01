import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DgaProgressBarComponent } from './dga-progress-bar.component';

@Component({
  standalone: true,
  imports: [DgaProgressBarComponent],
  template: `
    <dga-progress-bar
      [value]="value()"
      [indeterminate]="indeterminate()"
      [showLabel]="showLabel()"
      [color]="color()"
      [ariaLabel]="ariaLabel()"
    ></dga-progress-bar>
  `,
})
class TestHostComponent {
  value = signal(50);
  indeterminate = signal(false);
  showLabel = signal(false);
  color = signal<'primary' | 'success' | 'warning' | 'danger' | 'info'>('primary');
  ariaLabel = signal('Progress');
}

describe('DgaProgressBarComponent', () => {
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

  function getBar(): HTMLElement {
    return fixture.nativeElement.querySelector('.dga-progress-bar');
  }

  function getFill(): HTMLElement {
    return fixture.nativeElement.querySelector('.dga-progress-bar__fill');
  }

  it('should create the progress bar', () => {
    expect(getBar()).toBeTruthy();
  });

  it('should have role="progressbar"', () => {
    expect(getBar().getAttribute('role')).toBe('progressbar');
  });

  it('should set aria-valuenow for determinate', () => {
    expect(getBar().getAttribute('aria-valuenow')).toBe('50');
    expect(getBar().getAttribute('aria-valuemin')).toBe('0');
    expect(getBar().getAttribute('aria-valuemax')).toBe('100');
  });

  it('should set fill width based on value', () => {
    expect(getFill().style.width).toBe('50%');
  });

  it('should clamp value between 0 and 100', () => {
    host.value.set(150);
    fixture.detectChanges();
    expect(getFill().style.width).toBe('100%');

    host.value.set(-10);
    fixture.detectChanges();
    expect(getFill().style.width).toBe('0%');
  });

  it('should apply color class', () => {
    host.color.set('success');
    fixture.detectChanges();
    expect(getBar().classList.contains('dga-progress-bar--success')).toBe(true);
  });

  it('should show label when showLabel is true', () => {
    host.showLabel.set(true);
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('.dga-progress-bar__label');
    expect(label).toBeTruthy();
    expect(label.textContent).toContain('50%');
  });

  it('should not show label when indeterminate', () => {
    host.showLabel.set(true);
    host.indeterminate.set(true);
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('.dga-progress-bar__label');
    expect(label).toBeNull();
  });

  it('should add indeterminate class', () => {
    host.indeterminate.set(true);
    fixture.detectChanges();
    expect(getBar().classList.contains('dga-progress-bar--indeterminate')).toBe(true);
  });

  it('should not have aria-valuenow when indeterminate', () => {
    host.indeterminate.set(true);
    fixture.detectChanges();
    expect(getBar().getAttribute('aria-valuenow')).toBeNull();
  });

  it('should have aria-label', () => {
    expect(getBar().getAttribute('aria-label')).toBe('Progress');
  });
});
