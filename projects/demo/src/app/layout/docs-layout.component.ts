import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DocsSidebarComponent } from './docs-sidebar.component';

@Component({
  selector: 'app-docs-layout',
  standalone: true,
  imports: [RouterOutlet, DocsSidebarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="docs-layout">
      <app-docs-sidebar />
      <main class="docs-layout__main" id="main-content">
        <router-outlet />
      </main>
    </div>
  `,
  styles: `
    .docs-layout {
      display: flex;
      min-height: 100vh;
    }

    .docs-layout__main {
      flex: 1;
      min-width: 0;
      padding: var(--dga-spacing-2xl, 40px) var(--dga-spacing-3xl, 64px);
      max-width: 960px;
    }

    @media (max-width: 768px) {
      .docs-layout {
        flex-direction: column;
      }

      .docs-layout__main {
        padding: var(--dga-spacing-lg, 24px);
      }
    }
  `,
})
export class DocsLayoutComponent {}
