import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DgaTooltipDirective } from './dga-tooltip.directive';

@Component({
  standalone: true,
  imports: [DgaTooltipDirective],
  template: `
    <button
      [dgaTooltip]="tooltipText()"
      [dgaTooltipPosition]="position()"
    >
      Hover me
    </button>
  `,
})
class TestHostComponent {
  tooltipText = signal('Tooltip content');
  position = signal<'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end'>('top');
}

describe('DgaTooltipDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;
  let button: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();

    button = fixture.nativeElement.querySelector('button');
  });

  afterEach(() => {
    // Clean up any tooltips left in the DOM
    document.querySelectorAll('.dga-tooltip').forEach((el) => el.remove());
  });

  function getTooltip(): HTMLElement | null {
    return document.querySelector('.dga-tooltip');
  }

  it('should set aria-describedby on host element', () => {
    expect(button.hasAttribute('aria-describedby')).toBe(true);
  });

  it('should show tooltip on mouseenter', () => {
    button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    expect(getTooltip()).toBeTruthy();
  });

  it('should hide tooltip on mouseleave', () => {
    button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    expect(getTooltip()).toBeTruthy();

    button.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
    expect(getTooltip()).toBeNull();
  });

  it('should show tooltip on focus', () => {
    button.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
    expect(getTooltip()).toBeTruthy();
  });

  it('should hide tooltip on blur', () => {
    button.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
    button.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
    expect(getTooltip()).toBeNull();
  });

  it('should display the tooltip text', () => {
    button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    const tooltip = getTooltip()!;
    expect(tooltip.textContent).toBe('Tooltip content');
  });

  it('should have role="tooltip"', () => {
    button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    const tooltip = getTooltip()!;
    expect(tooltip.getAttribute('role')).toBe('tooltip');
  });

  it('should have matching id for aria-describedby', () => {
    const describedById = button.getAttribute('aria-describedby');
    button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    const tooltip = getTooltip()!;
    expect(tooltip.getAttribute('id')).toBe(describedById);
  });

  it('should apply position class', () => {
    host.position.set('bottom');
    fixture.detectChanges();

    button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    const tooltip = getTooltip()!;
    expect(tooltip.classList.contains('dga-tooltip--bottom')).toBe(true);
  });

  it('should dismiss on Escape key', () => {
    button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    expect(getTooltip()).toBeTruthy();

    button.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
    );
    expect(getTooltip()).toBeNull();
  });

  it('should clean up tooltip on destroy', () => {
    button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    expect(getTooltip()).toBeTruthy();

    fixture.destroy();
    expect(getTooltip()).toBeNull();
  });
});
