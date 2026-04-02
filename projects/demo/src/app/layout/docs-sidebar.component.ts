import { Component, ChangeDetectionStrategy, inject, computed, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslationService } from '../i18n/translation.service';

interface SidebarSection {
  titleKey: string;
  icon?: string;
  children: { titleKey: string; route: string }[];
  expanded?: boolean;
}

@Component({
  selector: 'app-docs-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <aside class="docs-sidebar">
      <div class="docs-sidebar__header">
        <div class="docs-sidebar__brand">
          <span class="docs-sidebar__logo">DGA</span>
          <span class="docs-sidebar__version">v1.0</span>
        </div>
      </div>

      <nav class="docs-sidebar__nav">
        <a routerLink="/" routerLinkActive="docs-sidebar__link--active"
           [routerLinkActiveOptions]="{ exact: true }"
           class="docs-sidebar__link docs-sidebar__link--home">
          {{ i18n.t('sidebar.home') }}
        </a>

        @for (section of sections(); track section.titleKey) {
          <div class="docs-sidebar__section">
            <button
              class="docs-sidebar__section-title"
              [class.docs-sidebar__section-title--expanded]="isExpanded(section.titleKey)"
              (click)="toggle(section.titleKey)"
            >
              {{ i18n.t(section.titleKey) }}
              <svg class="docs-sidebar__chevron" width="12" height="12" viewBox="0 0 12 12">
                <path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.5"/>
              </svg>
            </button>

            @if (isExpanded(section.titleKey)) {
              <div class="docs-sidebar__children">
                @for (child of section.children; track child.route) {
                  <a
                    [routerLink]="child.route"
                    routerLinkActive="docs-sidebar__link--active"
                    class="docs-sidebar__link"
                  >
                    {{ i18n.t(child.titleKey) }}
                  </a>
                }
              </div>
            }
          </div>
        }
      </nav>

      <div class="docs-sidebar__footer">
        <button class="docs-sidebar__lang-btn" (click)="toggleLang()">
          {{ i18n.isAr() ? 'English' : 'العربية' }}
        </button>
      </div>
    </aside>
  `,
  styles: `
    .docs-sidebar {
      width: 260px;
      min-width: 260px;
      height: 100vh;
      position: sticky;
      top: 0;
      border-inline-end: 1px solid var(--dga-neutral-color-200, #e5e7eb);
      background: #fff;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      font-size: 0.875rem;
    }

    .docs-sidebar__header {
      padding: var(--dga-spacing-lg, 24px) var(--dga-spacing-md, 16px);
      border-bottom: 1px solid var(--dga-neutral-color-200, #e5e7eb);
    }

    .docs-sidebar__brand {
      display: flex;
      align-items: center;
      gap: var(--dga-spacing-sm, 8px);
    }

    .docs-sidebar__logo {
      font-weight: 700;
      font-size: 1rem;
      color: var(--dga-primary-color-600, #25935f);
    }

    .docs-sidebar__version {
      font-size: 0.75rem;
      color: var(--dga-neutral-color-400, #9ca3af);
      background: var(--dga-neutral-color-100, #f3f4f6);
      padding: 2px 8px;
      border-radius: 9999px;
    }

    .docs-sidebar__nav {
      flex: 1;
      padding: var(--dga-spacing-md, 16px) 0;
    }

    .docs-sidebar__link {
      display: block;
      padding: var(--dga-spacing-xs, 8px) var(--dga-spacing-lg, 24px);
      color: var(--dga-neutral-color-600, #4b5563);
      text-decoration: none;
      transition: background 0.15s, color 0.15s;
    }

    .docs-sidebar__link:hover {
      background: var(--dga-neutral-color-50, #f9fafb);
    }

    .docs-sidebar__link--active {
      color: var(--dga-primary-color-600, #25935f);
      background: var(--dga-primary-color-50, #f0fdf4);
      font-weight: 600;
    }

    .docs-sidebar__link--home {
      padding-inline-start: var(--dga-spacing-md, 16px);
      font-weight: 500;
    }

    .docs-sidebar__section-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: var(--dga-spacing-sm, 8px) var(--dga-spacing-md, 16px);
      border: none;
      background: none;
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--dga-neutral-color-800, #1f2937);
      cursor: pointer;
      font-family: inherit;
      text-align: inherit;
    }

    .docs-sidebar__chevron {
      transition: transform 0.2s;
    }

    .docs-sidebar__section-title--expanded .docs-sidebar__chevron {
      transform: rotate(180deg);
    }

    .docs-sidebar__children {
      padding-bottom: var(--dga-spacing-xs, 4px);
    }

    .docs-sidebar__children .docs-sidebar__link {
      padding-inline-start: var(--dga-spacing-2xl, 40px);
      font-size: 0.825rem;
    }

    .docs-sidebar__footer {
      padding: var(--dga-spacing-md, 16px);
      border-top: 1px solid var(--dga-neutral-color-200, #e5e7eb);
    }

    .docs-sidebar__lang-btn {
      display: block;
      width: 100%;
      padding: var(--dga-spacing-xs, 8px);
      border: 1px solid var(--dga-neutral-color-200, #e5e7eb);
      border-radius: var(--dga-radius-md, 6px);
      background: #fff;
      font-size: 0.8rem;
      color: var(--dga-neutral-color-600, #4b5563);
      cursor: pointer;
      font-family: inherit;
      text-align: center;
    }
  `,
})
export class DocsSidebarComponent {
  readonly i18n = inject(TranslationService);

  private expandedSections = signal(new Set<string>(['sidebar.components', 'sidebar.templates']));

  readonly sections = computed<SidebarSection[]>(() => [
    {
      titleKey: 'sidebar.components',
      children: [
        { titleKey: 'sidebar.buttons', route: '/buttons' },
        { titleKey: 'sidebar.forms', route: '/forms' },
        { titleKey: 'sidebar.cards', route: '/cards' },
        { titleKey: 'sidebar.tables', route: '/tables' },
        { titleKey: 'sidebar.navigation', route: '/navigation' },
        { titleKey: 'sidebar.feedback', route: '/feedback' },
        { titleKey: 'sidebar.loading', route: '/loading' },
      ],
    },
    {
      titleKey: 'sidebar.templates',
      children: [
        { titleKey: 'sidebar.tpl.dashboard', route: '/templates/dashboard' },
        { titleKey: 'sidebar.tpl.login', route: '/templates/login' },
        { titleKey: 'sidebar.tpl.register', route: '/templates/register' },
        { titleKey: 'sidebar.tpl.dataList', route: '/templates/data-list' },
        { titleKey: 'sidebar.tpl.settings', route: '/templates/settings' },
      ],
    },
  ]);

  isExpanded(key: string): boolean {
    return this.expandedSections().has(key);
  }

  toggle(key: string): void {
    const set = new Set(this.expandedSections());
    if (set.has(key)) set.delete(key); else set.add(key);
    this.expandedSections.set(set);
  }

  toggleLang(): void {
    this.i18n.setLang(this.i18n.isAr() ? 'en' : 'ar');
  }
}
