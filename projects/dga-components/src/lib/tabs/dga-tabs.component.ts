import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  signal,
  computed,
  contentChildren,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { DgaTabComponent } from './dga-tab.component';

let nextTabGroupId = 0;

@Component({
  selector: 'dga-tabs',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './dga-tabs.component.html',
  styleUrls: ['./dga-tabs.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgaTabsComponent {
  /** Tab layout orientation */
  orientation = input<'horizontal' | 'vertical'>('horizontal');

  /** Active tab index */
  activeIndex = signal<number>(0);

  /** Query all projected dga-tab children */
  tabs = contentChildren(DgaTabComponent);

  /** Unique ID prefix for ARIA */
  private readonly groupId = `dga-tabs-${nextTabGroupId++}`;

  /** CSS classes for the container */
  containerClasses = computed(() => {
    const classes = ['dga-tabs'];
    if (this.orientation() === 'vertical') {
      classes.push('dga-tabs--vertical');
    }
    return classes.join(' ');
  });

  /** Generate a tab button ID */
  tabId(index: number): string {
    return `${this.groupId}-tab-${index}`;
  }

  /** Generate a panel ID */
  panelId(index: number): string {
    return `${this.groupId}-panel-${index}`;
  }

  /** Select a tab by index */
  selectTab(index: number): void {
    const tabList = this.tabs();
    if (index >= 0 && index < tabList.length && !tabList[index].disabled()) {
      this.activeIndex.set(index);
    }
  }

  /** Handle keyboard navigation within the tab list */
  onKeydown(event: KeyboardEvent): void {
    const tabList = this.tabs();
    const isVertical = this.orientation() === 'vertical';
    const isRtl =
      typeof document !== 'undefined' &&
      document.documentElement.dir === 'rtl';

    let nextKey: string;
    let prevKey: string;

    if (isVertical) {
      nextKey = 'ArrowDown';
      prevKey = 'ArrowUp';
    } else {
      nextKey = isRtl ? 'ArrowLeft' : 'ArrowRight';
      prevKey = isRtl ? 'ArrowRight' : 'ArrowLeft';
    }

    let newIndex = this.activeIndex();

    if (event.key === nextKey) {
      event.preventDefault();
      newIndex = this.findNextEnabledTab(newIndex, 1, tabList);
    } else if (event.key === prevKey) {
      event.preventDefault();
      newIndex = this.findNextEnabledTab(newIndex, -1, tabList);
    } else if (event.key === 'Home') {
      event.preventDefault();
      newIndex = this.findNextEnabledTab(-1, 1, tabList);
    } else if (event.key === 'End') {
      event.preventDefault();
      newIndex = this.findNextEnabledTab(tabList.length, -1, tabList);
    }

    if (newIndex !== this.activeIndex()) {
      this.selectTab(newIndex);
    }
  }

  /** Find the next enabled tab in the given direction */
  private findNextEnabledTab(
    currentIndex: number,
    direction: 1 | -1,
    tabList: readonly DgaTabComponent[]
  ): number {
    let index = currentIndex + direction;
    while (index >= 0 && index < tabList.length) {
      if (!tabList[index].disabled()) {
        return index;
      }
      index += direction;
    }
    return currentIndex;
  }
}
