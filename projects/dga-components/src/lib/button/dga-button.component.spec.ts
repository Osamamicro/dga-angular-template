import { vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DgaButtonComponent } from './dga-button.component';

describe('DgaButtonComponent', () => {
  let component: DgaButtonComponent;
  let fixture: ComponentFixture<DgaButtonComponent>;
  let buttonElement: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DgaButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DgaButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    buttonElement = fixture.nativeElement.querySelector('button');
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply correct variant class', () => {
    // Default variant is primary
    expect(buttonElement.classList).toContain('dga-btn-primary');

    fixture.componentRef.setInput('variant', 'danger');
    fixture.detectChanges();
    buttonElement = fixture.nativeElement.querySelector('button');

    expect(buttonElement.classList).toContain('dga-btn-danger');
    expect(buttonElement.classList).not.toContain('dga-btn-primary');
  });

  it('should apply correct size class', () => {
    // Default size is lg
    expect(buttonElement.classList).toContain('dga-btn-lg');

    fixture.componentRef.setInput('size', 'sm');
    fixture.detectChanges();
    buttonElement = fixture.nativeElement.querySelector('button');

    expect(buttonElement.classList).toContain('dga-btn-sm');
    expect(buttonElement.classList).not.toContain('dga-btn-lg');
  });

  it('should be disabled when disabled input is true', () => {
    expect(buttonElement.disabled).toBe(false);

    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    buttonElement = fixture.nativeElement.querySelector('button');

    expect(buttonElement.disabled).toBe(true);
  });

  it('should show loading state', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    buttonElement = fixture.nativeElement.querySelector('button');

    expect(buttonElement.classList).toContain('dga-btn--loading');
    expect(buttonElement.disabled).toBe(true);

    const spinner = fixture.nativeElement.querySelector('.dga-btn__spinner');
    expect(spinner).toBeTruthy();
  });

  it('should have correct ARIA attributes', () => {
    // Default state: no aria-label, aria-disabled false, aria-busy false
    expect(buttonElement.getAttribute('aria-disabled')).toBe('false');
    expect(buttonElement.getAttribute('aria-busy')).toBe('false');

    fixture.componentRef.setInput('ariaLabel', 'Submit form');
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    buttonElement = fixture.nativeElement.querySelector('button');

    expect(buttonElement.getAttribute('aria-label')).toBe('Submit form');
    expect(buttonElement.getAttribute('aria-disabled')).toBe('true');
  });

  it('should default to type="button"', () => {
    expect(buttonElement.type).toBe('button');
  });

  it('should apply full-width class when fullWidth is true', () => {
    expect(buttonElement.classList).not.toContain('dga-btn--full-width');

    fixture.componentRef.setInput('fullWidth', true);
    fixture.detectChanges();
    buttonElement = fixture.nativeElement.querySelector('button');

    expect(buttonElement.classList).toContain('dga-btn--full-width');
  });

  it('should change type when type input changes', () => {
    fixture.componentRef.setInput('type', 'submit');
    fixture.detectChanges();
    buttonElement = fixture.nativeElement.querySelector('button');

    expect(buttonElement.type).toBe('submit');
  });
});
