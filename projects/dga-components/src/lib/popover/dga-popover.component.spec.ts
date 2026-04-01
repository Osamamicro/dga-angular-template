import { vi } from 'vitest';
import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DgaPopoverComponent } from './dga-popover.component';

@Component({
  standalone: true,
  imports: [DgaPopoverComponent],
  template: `
    <dga-popover [position]="position()" (openChange)="onOpenChange($event)">
      <button popover-trigger>Toggle</button>
      <p>Popover content here</p>
    </dga-popover>
  `,
})
class TestHostComponent {
  position = signal<'top' | 'bottom' | 'left' | 'right'>('bottom');
  lastOpenState: boolean | null = null;

  onOpenChange(isOpen: boolean): void {
    this.lastOpenState = isOpen;
  }
}

describe('DgaPopoverComponent', () => {
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

  function getTrigger(): HTMLElement {
    return fixture.nativeElement.querySelector('.dga-popover__trigger');
  }

  function getPanel(): HTMLElement | null {
    return fixture.nativeElement.querySelector('.dga-popover__panel');
  }

  it('should create the popover', () => {
    const popover = fixture.nativeElement.querySelector('.dga-popover');
    expect(popover).toBeTruthy();
  });

  it('should not show panel initially', () => {
    expect(getPanel()).toBeNull();
  });

  it('should show panel when trigger is clicked', () => {
    getTrigger().click();
    fixture.detectChanges();

    expect(getPanel()).toBeTruthy();
  });

  it('should hide panel when trigger is clicked again', () => {
    getTrigger().click();
    fixture.detectChanges();
    expect(getPanel()).toBeTruthy();

    getTrigger().click();
    fixture.detectChanges();
    expect(getPanel()).toBeNull();
  });

  it('should have aria-expanded on trigger', () => {
    const trigger = getTrigger();
    expect(trigger.getAttribute('aria-expanded')).toBe('false');

    trigger.click();
    fixture.detectChanges();

    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });

  it('should have aria-controls linking to panel id', () => {
    const trigger = getTrigger();
    const controlsId = trigger.getAttribute('aria-controls');
    expect(controlsId).toBeTruthy();

    trigger.click();
    fixture.detectChanges();

    const panel = getPanel()!;
    expect(panel.getAttribute('id')).toBe(controlsId);
  });

  it('should have role="dialog" on panel', () => {
    getTrigger().click();
    fixture.detectChanges();

    expect(getPanel()!.getAttribute('role')).toBe('dialog');
  });

  it('should render projected content in panel', () => {
    getTrigger().click();
    fixture.detectChanges();

    const panel = getPanel()!;
    expect(panel.textContent).toContain('Popover content here');
  });

  it('should apply position class', () => {
    host.position.set('top');
    fixture.detectChanges();

    getTrigger().click();
    fixture.detectChanges();

    const panel = getPanel()!;
    expect(panel.classList.contains('dga-popover__panel--top')).toBe(true);
  });

  it('should close on Escape key', async () => {
    vi.useFakeTimers();

    getTrigger().click();
    fixture.detectChanges();
    vi.runAllTimers();

    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
    );
    fixture.detectChanges();

    expect(getPanel()).toBeNull();

    vi.useRealTimers();
  });

  it('should emit openChange events', () => {
    getTrigger().click();
    fixture.detectChanges();
    expect(host.lastOpenState).toBe(true);

    getTrigger().click();
    fixture.detectChanges();
    expect(host.lastOpenState).toBe(false);
  });
});
