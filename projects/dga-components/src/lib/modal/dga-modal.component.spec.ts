import { vi } from 'vitest';
import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DgaModalComponent } from './dga-modal.component';

@Component({
  standalone: true,
  imports: [DgaModalComponent],
  template: `
    <button class="trigger" (click)="isOpen.set(true)">Open</button>
    <dga-modal
      [open]="isOpen()"
      [size]="size()"
      [closeOnBackdrop]="closeOnBackdrop()"
      [closeOnEscape]="closeOnEscape()"
      (closed)="isOpen.set(false)"
    >
      <span modal-title>Test Title</span>
      <p>Modal body content</p>
      <div modal-footer>
        <button class="footer-btn">OK</button>
      </div>
    </dga-modal>
  `,
})
class TestHostComponent {
  isOpen = signal(false);
  size = signal<'sm' | 'md' | 'lg' | 'fullscreen'>('md');
  closeOnBackdrop = signal(true);
  closeOnEscape = signal(true);
}

describe('DgaModalComponent', () => {
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

  afterEach(() => {
    // Ensure body scroll is restored
    document.body.style.overflow = '';
  });

  function getBackdrop(): HTMLElement | null {
    return fixture.nativeElement.querySelector('.dga-modal__backdrop');
  }

  function getDialog(): HTMLElement | null {
    return fixture.nativeElement.querySelector('[role="dialog"]');
  }

  function getCloseButton(): HTMLButtonElement | null {
    return fixture.nativeElement.querySelector('.dga-modal__close');
  }

  it('should not render when closed', () => {
    expect(getBackdrop()).toBeNull();
    expect(getDialog()).toBeNull();
  });

  it('should render when open', () => {
    host.isOpen.set(true);
    fixture.detectChanges();

    expect(getBackdrop()).toBeTruthy();
    expect(getDialog()).toBeTruthy();
  });

  it('should have correct ARIA attributes', () => {
    host.isOpen.set(true);
    fixture.detectChanges();

    const dialog = getDialog()!;
    expect(dialog.getAttribute('role')).toBe('dialog');
    expect(dialog.getAttribute('aria-modal')).toBe('true');
    expect(dialog.hasAttribute('aria-labelledby')).toBe(true);
  });

  it('should render projected title', () => {
    host.isOpen.set(true);
    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('.dga-modal__title');
    expect(title.textContent).toContain('Test Title');
  });

  it('should render projected body content', () => {
    host.isOpen.set(true);
    fixture.detectChanges();

    const body = fixture.nativeElement.querySelector('.dga-modal__body');
    expect(body.textContent).toContain('Modal body content');
  });

  it('should render projected footer', () => {
    host.isOpen.set(true);
    fixture.detectChanges();

    const footer = fixture.nativeElement.querySelector('.dga-modal__footer');
    expect(footer.textContent).toContain('OK');
  });

  it('should close when close button is clicked', () => {
    host.isOpen.set(true);
    fixture.detectChanges();

    getCloseButton()!.click();
    fixture.detectChanges();

    expect(host.isOpen()).toBe(false);
    expect(getDialog()).toBeNull();
  });

  it('should close when backdrop is clicked', () => {
    host.isOpen.set(true);
    fixture.detectChanges();

    const backdrop = getBackdrop()!;
    backdrop.click();
    fixture.detectChanges();

    expect(host.isOpen()).toBe(false);
  });

  it('should not close on backdrop click when closeOnBackdrop is false', () => {
    host.closeOnBackdrop.set(false);
    host.isOpen.set(true);
    fixture.detectChanges();

    const backdrop = getBackdrop()!;
    backdrop.click();
    fixture.detectChanges();

    expect(host.isOpen()).toBe(true);
  });

  it('should close on Escape key', () => {
    host.isOpen.set(true);
    fixture.detectChanges();

    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
    );
    fixture.detectChanges();

    expect(host.isOpen()).toBe(false);
  });

  it('should not close on Escape when closeOnEscape is false', () => {
    host.closeOnEscape.set(false);
    host.isOpen.set(true);
    fixture.detectChanges();

    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
    );
    fixture.detectChanges();

    expect(host.isOpen()).toBe(true);
  });

  it('should apply size class', () => {
    host.size.set('lg');
    host.isOpen.set(true);
    fixture.detectChanges();

    const dialog = getDialog()!;
    expect(dialog.classList.contains('dga-modal__dialog--lg')).toBe(true);
  });

  it('should prevent body scroll when open', () => {
    host.isOpen.set(true);
    fixture.detectChanges();

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should restore body scroll when closed', () => {
    host.isOpen.set(true);
    fixture.detectChanges();
    expect(document.body.style.overflow).toBe('hidden');

    host.isOpen.set(false);
    fixture.detectChanges();

    expect(document.body.style.overflow).toBe('');
  });

  it('should have a close button with aria-label', () => {
    host.isOpen.set(true);
    fixture.detectChanges();

    const closeBtn = getCloseButton()!;
    expect(closeBtn.getAttribute('aria-label')).toBe('Close');
  });
});
