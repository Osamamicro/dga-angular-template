import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DgaSpinnerComponent } from './dga-spinner.component';

@Component({
  standalone: true,
  imports: [DgaSpinnerComponent],
  template: `
    <dga-spinner
      [size]="size()"
      [color]="color()"
      [ariaLabel]="ariaLabel()"
    ></dga-spinner>
  `,
})
class TestHostComponent {
  size = signal<'sm' | 'md' | 'lg'>('md');
  color = signal<'primary' | 'secondary' | 'neutral' | 'white'>('primary');
  ariaLabel = signal('Loading');
}

describe('DgaSpinnerComponent', () => {
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

  function getSpinner(): HTMLElement {
    return fixture.nativeElement.querySelector('.dga-spinner');
  }

  it('should create the spinner', () => {
    expect(getSpinner()).toBeTruthy();
  });

  it('should have role="status"', () => {
    expect(getSpinner().getAttribute('role')).toBe('status');
  });

  it('should have aria-label', () => {
    expect(getSpinner().getAttribute('aria-label')).toBe('Loading');
  });

  it('should apply size class', () => {
    host.size.set('lg');
    fixture.detectChanges();
    expect(getSpinner().classList.contains('dga-spinner--lg')).toBe(true);
  });

  it('should apply color class', () => {
    host.color.set('secondary');
    fixture.detectChanges();
    expect(getSpinner().classList.contains('dga-spinner--secondary')).toBe(true);
  });

  it('should contain an SVG', () => {
    const svg = fixture.nativeElement.querySelector('.dga-spinner__svg');
    expect(svg).toBeTruthy();
    expect(svg.getAttribute('aria-hidden')).toBe('true');
  });

  it('should update aria-label dynamically', () => {
    host.ariaLabel.set('Please wait');
    fixture.detectChanges();
    expect(getSpinner().getAttribute('aria-label')).toBe('Please wait');
  });
});
