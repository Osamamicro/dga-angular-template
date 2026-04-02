import { Component, ChangeDetectionStrategy, input } from '@angular/core';

export interface TocItem {
  label: string;
  anchorId: string;
  children?: TocItem[];
}

@Component({
  selector: 'app-docs-toc',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (items().length) {
      <nav class="docs-toc">
        <p class="docs-toc__title">{{ heading() }}</p>
        <ul class="docs-toc__list">
          @for (item of items(); track item.anchorId) {
            <li>
              <a class="docs-toc__link" [href]="'#' + item.anchorId">{{ item.label }}</a>
              @if (item.children?.length) {
                <ul class="docs-toc__sublist">
                  @for (child of item.children; track child.anchorId) {
                    <li>
                      <a class="docs-toc__link docs-toc__link--sub" [href]="'#' + child.anchorId">{{ child.label }}</a>
                    </li>
                  }
                </ul>
              }
            </li>
          }
        </ul>
      </nav>
    }
  `,
  styles: `
    .docs-toc {
      position: sticky;
      top: var(--dga-spacing-2xl, 40px);
      width: 200px;
      min-width: 200px;
      font-size: 0.8rem;
    }

    .docs-toc__title {
      font-weight: 600;
      color: var(--dga-neutral-color-800, #1f2937);
      margin: 0 0 var(--dga-spacing-sm, 8px);
      font-size: 0.8rem;
    }

    .docs-toc__list, .docs-toc__sublist {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .docs-toc__link {
      display: block;
      padding: 4px 0;
      color: var(--dga-neutral-color-500, #6b7280);
      text-decoration: none;
      border-inline-start: 2px solid transparent;
      padding-inline-start: var(--dga-spacing-sm, 8px);
      line-height: 1.6;
    }

    .docs-toc__link:hover {
      color: var(--dga-primary-color-600, #25935f);
    }

    .docs-toc__link--sub {
      padding-inline-start: var(--dga-spacing-lg, 24px);
      font-size: 0.75rem;
    }
  `,
})
export class DocsTocComponent {
  readonly heading = input<string>('On this page');
  readonly items = input<TocItem[]>([]);
}
