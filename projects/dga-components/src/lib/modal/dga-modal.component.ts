import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  output,
  computed,
  effect,
  ElementRef,
  OnDestroy,
  viewChild,
  inject,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type DgaModalSize = 'sm' | 'md' | 'lg' | 'fullscreen';

let nextId = 0;

@Component({
  selector: 'dga-modal',
  standalone: true,
  templateUrl: './dga-modal.component.html',
  styleUrls: ['./dga-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgaModalComponent implements OnDestroy {
  private readonly document = inject(DOCUMENT);

  /** Whether the modal is open */
  open = input<boolean>(false);

  /** Size of the modal */
  size = input<DgaModalSize>('md');

  /** Whether clicking the backdrop closes the modal */
  closeOnBackdrop = input<boolean>(true);

  /** Whether pressing Escape closes the modal */
  closeOnEscape = input<boolean>(true);

  /** Title for aria-labelledby */
  modalTitle = input<string>('');

  /** Emits when the modal requests to close */
  closed = output<void>();

  /** Unique IDs for ARIA */
  readonly modalId = `dga-modal-${nextId++}`;
  readonly titleId = `${this.modalId}-title`;

  /** Reference to the dialog container for focus trapping */
  dialogRef = viewChild<ElementRef<HTMLElement>>('dialogContainer');

  /** CSS classes */
  modalClasses = computed(() => {
    return `dga-modal__dialog dga-modal__dialog--${this.size()}`;
  });

  /** Track previously focused element */
  private previouslyFocused: HTMLElement | null = null;

  /** Bound keyboard handler */
  private keydownHandler = (event: KeyboardEvent) => this.onKeydown(event);

  constructor() {
    effect(() => {
      if (this.open()) {
        this.onOpen();
      } else {
        this.onClose();
      }
    });
  }

  ngOnDestroy(): void {
    this.removeKeydownListener();
    this.restoreBodyScroll();
  }

  /** Called when the modal opens — set up focus trap and listeners */
  onOpen(): void {
    this.previouslyFocused = this.document.activeElement as HTMLElement;
    this.preventBodyScroll();
    this.document.addEventListener('keydown', this.keydownHandler);

    // Focus the first focusable element inside the dialog
    requestAnimationFrame(() => {
      const dialog = this.dialogRef()?.nativeElement;
      if (dialog) {
        const focusable = this.getFocusableElements(dialog);
        if (focusable.length > 0) {
          focusable[0].focus();
        } else {
          dialog.focus();
        }
      }
    });
  }

  /** Called when the modal closes — clean up */
  onClose(): void {
    this.removeKeydownListener();
    this.restoreBodyScroll();

    // Return focus to trigger element
    if (this.previouslyFocused) {
      this.previouslyFocused.focus();
      this.previouslyFocused = null;
    }
  }

  /** Request close from internal actions */
  requestClose(): void {
    this.closed.emit();
  }

  /** Handle backdrop click */
  onBackdropClick(event: MouseEvent): void {
    if (this.closeOnBackdrop() && event.target === event.currentTarget) {
      this.requestClose();
    }
  }

  /** Handle keydown for Escape and focus trapping */
  private onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.closeOnEscape()) {
      event.preventDefault();
      this.requestClose();
      return;
    }

    if (event.key === 'Tab') {
      this.trapFocus(event);
    }
  }

  /** Trap Tab focus within the modal */
  private trapFocus(event: KeyboardEvent): void {
    const dialog = this.dialogRef()?.nativeElement;
    if (!dialog) return;

    const focusable = this.getFocusableElements(dialog);
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey) {
      if (this.document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
    } else {
      if (this.document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  /** Get all focusable elements within a container */
  private getFocusableElements(container: HTMLElement): HTMLElement[] {
    const selector =
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
    return Array.from(container.querySelectorAll<HTMLElement>(selector));
  }

  /** Prevent background scrolling */
  private preventBodyScroll(): void {
    this.document.body.style.overflow = 'hidden';
  }

  /** Restore background scrolling */
  private restoreBodyScroll(): void {
    this.document.body.style.overflow = '';
  }

  /** Remove the keydown listener */
  private removeKeydownListener(): void {
    this.document.removeEventListener('keydown', this.keydownHandler);
  }
}
