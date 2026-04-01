import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  signal,
} from '@angular/core';

@Component({
  selector: 'dga-accordion',
  standalone: true,
  templateUrl: './dga-accordion.component.html',
  styleUrls: ['./dga-accordion.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgaAccordionComponent {
  /** Whether multiple items can be expanded simultaneously */
  multi = input<boolean>(false);

  /** Tracks which item IDs are currently expanded */
  expandedItems = signal<Set<string>>(new Set());

  /** Register an item as expanded */
  expandItem(id: string): void {
    this.expandedItems.update((current) => {
      const next = new Set(current);
      if (!this.multi()) {
        next.clear();
      }
      next.add(id);
      return next;
    });
  }

  /** Remove an item from expanded set */
  collapseItem(id: string): void {
    this.expandedItems.update((current) => {
      const next = new Set(current);
      next.delete(id);
      return next;
    });
  }

  /** Collapse all items except the given one */
  collapseOthers(exceptId: string): void {
    this.expandedItems.update(() => {
      const next = new Set<string>();
      next.add(exceptId);
      return next;
    });
  }
}
