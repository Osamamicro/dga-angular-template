import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  TemplateRef,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'dga-tab',
  standalone: true,
  template: `
    <ng-template #contentTpl>
      <ng-content></ng-content>
    </ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgaTabComponent {
  /** Tab label displayed in the tab list */
  label = input.required<string>();

  /** Whether this tab is disabled */
  disabled = input<boolean>(false);

  /** Optional icon name or class */
  icon = input<string | undefined>(undefined);

  /** Template reference for lazy content rendering */
  contentTpl = viewChild.required<TemplateRef<unknown>>('contentTpl');
}
