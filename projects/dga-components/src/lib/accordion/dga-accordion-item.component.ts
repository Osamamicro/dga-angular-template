import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  inject,
  OnInit,
  effect,
} from '@angular/core';
import { DgaAccordionComponent } from './dga-accordion.component';

let nextId = 0;

@Component({
  selector: 'dga-accordion-item',
  standalone: true,
  templateUrl: './dga-accordion-item.component.html',
  styleUrls: ['./dga-accordion.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgaAccordionItemComponent implements OnInit {
  private readonly accordion = inject(DgaAccordionComponent);

  /** Header title text */
  title = input.required<string>();

  /** Whether this item is initially expanded */
  expanded = input<boolean>(false);

  /** Whether this item is disabled */
  disabled = input<boolean>(false);

  /** Emits when the expanded state changes */
  expandedChange = output<boolean>();

  /** Internal expanded state */
  isExpanded = signal<boolean>(false);

  /** Unique panel ID for ARIA */
  readonly panelId = `dga-accordion-panel-${nextId++}`;

  /** Unique header ID for ARIA */
  readonly headerId = `dga-accordion-header-${this.panelId}`;

  constructor() {
    // Sync input to internal state
    effect(() => {
      const value = this.expanded();
      this.isExpanded.set(value);
    });
  }

  ngOnInit(): void {
    if (this.expanded()) {
      this.isExpanded.set(true);
      this.accordion.expandItem(this.panelId);
    }
  }

  /** Toggle the expanded state of this item */
  toggle(): void {
    if (this.disabled()) {
      return;
    }

    const next = !this.isExpanded();
    this.isExpanded.set(next);
    this.expandedChange.emit(next);

    if (next) {
      if (!this.accordion.multi()) {
        this.accordion.collapseOthers(this.panelId);
      } else {
        this.accordion.expandItem(this.panelId);
      }
    } else {
      this.accordion.collapseItem(this.panelId);
    }
  }
}
