import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
} from '@angular/core';

export interface DgaSidebarItem {
  label: string;
  href?: string;
  icon?: string;
  active?: boolean;
  children?: DgaSidebarItem[];
}

@Component({
  selector: 'dga-sidebar',
  standalone: true,
  templateUrl: './dga-sidebar.component.html',
  styleUrls: ['./dga-sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgaSidebarComponent {
  items = input<DgaSidebarItem[]>([]);
  collapsed = input<boolean>(false);
  collapsedChange = output<boolean>();

  expandedGroups = signal<Set<string>>(new Set());

  sidebarClasses = computed(() => {
    return this.collapsed() ? 'dga-sidebar dga-sidebar--collapsed' : 'dga-sidebar';
  });

  toggleCollapse(): void {
    this.collapsedChange.emit(!this.collapsed());
  }

  toggleGroup(label: string): void {
    this.expandedGroups.update((s) => {
      const next = new Set(s);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  }

  isGroupExpanded(label: string): boolean {
    return this.expandedGroups().has(label);
  }
}
