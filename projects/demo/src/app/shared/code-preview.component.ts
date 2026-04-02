// projects/demo/src/app/shared/code-preview.component.ts
import { Component, ChangeDetectionStrategy, input, signal } from '@angular/core';

@Component({
  selector: 'app-code-preview',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="code-preview">
      <div class="code-preview__tabs">
        <button
          class="code-preview__tab"
          [class.code-preview__tab--active]="activeTab() === 'visual'"
          (click)="activeTab.set('visual')"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/>
          </svg>
          {{ visualLabel() }}
        </button>
        <button
          class="code-preview__tab"
          [class.code-preview__tab--active]="activeTab() === 'code'"
          (click)="activeTab.set('code')"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
          </svg>
          {{ codeLabel() }}
        </button>
      </div>

      <div class="code-preview__content">
        @if (activeTab() === 'visual') {
          <div class="code-preview__visual">
            <ng-content select="[visual]" />
          </div>
        } @else {
          <div class="code-preview__code">
            <pre><code>{{ code() }}</code></pre>
          </div>
        }
      </div>
    </div>
  `,
  styles: `
    .code-preview {
      border: 1px solid var(--dga-neutral-color-200, #e5e7eb);
      border-radius: var(--dga-radius-lg, 8px);
      overflow: hidden;
      margin: var(--dga-spacing-lg, 24px) 0;
    }

    .code-preview__tabs {
      display: flex;
      gap: var(--dga-spacing-xl, 32px);
      padding: var(--dga-spacing-md, 16px) var(--dga-spacing-lg, 24px) 0;
      border-bottom: 1px solid var(--dga-neutral-color-200, #e5e7eb);
      background: #fff;
    }

    .code-preview__tab {
      display: flex;
      align-items: center;
      gap: var(--dga-spacing-xs, 8px);
      padding: var(--dga-spacing-sm, 8px) 0;
      border: none;
      background: none;
      font-size: 0.875rem;
      color: var(--dga-neutral-color-500, #6b7280);
      cursor: pointer;
      border-bottom: 2px solid transparent;
      margin-bottom: -1px;
      font-family: inherit;
    }

    .code-preview__tab--active {
      color: var(--dga-neutral-color-900, #111827);
      border-bottom-color: var(--dga-primary-color-600, #25935f);
    }

    .code-preview__visual {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 120px;
      padding: var(--dga-spacing-2xl, 40px);
      background: #fff;
    }

    .code-preview__code {
      background: #1e1e1e;
      padding: var(--dga-spacing-lg, 24px);
      overflow-x: auto;
    }

    .code-preview__code pre {
      margin: 0;
      font-family: 'Consolas', 'Monaco', monospace;
      font-size: 0.85rem;
      line-height: 1.6;
      color: #d4d4d4;
      direction: ltr;
      text-align: left;
    }
  `,
})
export class CodePreviewComponent {
  readonly visualLabel = input<string>('Visual');
  readonly codeLabel = input<string>('Code');
  readonly code = input<string>('');
  readonly activeTab = signal<'visual' | 'code'>('visual');
}
