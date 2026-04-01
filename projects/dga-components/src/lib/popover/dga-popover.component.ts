import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
  ElementRef,
  OnDestroy,
  inject,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type DgaPopoverPosition = 'top' | 'bottom' | 'left' | 'right';

let nextId = 0;

@Component({
  selector: 'dga-popover',
  standalone: true,
  templateUrl: './dga-popover.component.html',
  styleUrls: ['./dga-popover.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'dga-popover-host',
  },
})
export class DgaPopoverComponent implements OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly elementRef = inject(ElementRef);

  /** Position of the popover */
  position = input<DgaPopoverPosition>('bottom');

  /** Emits when the popover opens or closes */
  openChange = output<boolean>();

  /** Internal open state */
  isOpen = signal(false);

  /** Unique ID for ARIA */
  readonly popoverId = `dga-popover-${nextId++}`;

  /** Popover panel classes */
  panelClasses = computed(() => {
    return `dga-popover__panel dga-popover__panel--${this.position()}`;
  });

  private outsideClickHandler = (event: MouseEvent) =>
    this.onOutsideClick(event);
  private keydownHandler = (event: KeyboardEvent) => this.onKeydown(event);

  ngOnDestroy(): void {
    this.removeListeners();
  }

  /** Toggle the popover */
  toggle(): void {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  /** Open the popover */
  open(): void {
    this.isOpen.set(true);
    this.openChange.emit(true);
    this.addListeners();
  }

  /** Close the popover */
  close(): void {
    this.isOpen.set(false);
    this.openChange.emit(false);
    this.removeListeners();
  }

  private onOutsideClick(event: MouseEvent): void {
    const target = event.target as Node;
    if (!this.elementRef.nativeElement.contains(target)) {
      this.close();
    }
  }

  private onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
    }
  }

  private addListeners(): void {
    // Delay to avoid catching the opening click
    setTimeout(() => {
      this.document.addEventListener('click', this.outsideClickHandler);
      this.document.addEventListener('keydown', this.keydownHandler);
    });
  }

  private removeListeners(): void {
    this.document.removeEventListener('click', this.outsideClickHandler);
    this.document.removeEventListener('keydown', this.keydownHandler);
  }
}
