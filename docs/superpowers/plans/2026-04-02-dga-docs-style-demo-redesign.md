# DGA Docs-Style Demo Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the demo app to match the DGA design system website (design.dga.gov.sa) — sidebar navigation, live demo + code tabs, Angular code examples, full AR/EN localization, and proper documentation-style layout.

**Architecture:** Replace the current header-tab navigation with a sidebar-based docs layout. Each component page shows a live visual demo with a Visual/Code tab toggle, Angular code snippets, and section-based content (appearance, types, styles, states, accessibility). A shared `DocsLayoutComponent` wraps all pages with sidebar + optional right-side TOC. The existing `TranslationService` handles all AR/EN text.

**Tech Stack:** Angular 21 (standalone components, signals, OnPush), SCSS with DGA design tokens, existing `dga-components` library (32 components), custom `TranslationService`.

**Reference:** https://design.dga.gov.sa (React-based original — we recreate the layout pattern in Angular)

---

## File Structure

### New Files to Create

| File | Responsibility |
|------|----------------|
| `projects/demo/src/app/layout/docs-layout.component.ts` | Sidebar + main content + optional right TOC shell |
| `projects/demo/src/app/layout/docs-sidebar.component.ts` | Left sidebar with collapsible component tree navigation |
| `projects/demo/src/app/layout/docs-toc.component.ts` | Right-side "On this page" table of contents |
| `projects/demo/src/app/shared/code-preview.component.ts` | Visual/Code tab toggle with live preview + syntax-highlighted code |
| `projects/demo/src/app/shared/section-header.component.ts` | Reusable section heading (title + description, bilingual) |

### Files to Rewrite

| File | Change |
|------|--------|
| `projects/demo/src/app/app.ts` | Replace header/footer shell with DocsLayout |
| `projects/demo/src/app/app.html` | Simplify to just router-outlet inside DocsLayout |
| `projects/demo/src/app/app.scss` | Remove old header/footer/accent styles |
| `projects/demo/src/app/app.routes.ts` | Nest component routes under docs layout |
| `projects/demo/src/app/pages/home/home.component.ts` | Landing page within docs layout |
| `projects/demo/src/app/pages/buttons/buttons.component.ts` | DGA docs pattern with Visual/Code tabs |
| `projects/demo/src/app/pages/forms/forms.component.ts` | Same pattern |
| `projects/demo/src/app/pages/cards/cards.component.ts` | Same pattern |
| `projects/demo/src/app/pages/tables/tables.component.ts` | Same pattern |
| `projects/demo/src/app/pages/navigation/navigation.component.ts` | Same pattern |
| `projects/demo/src/app/pages/feedback/feedback.component.ts` | Same pattern |
| `projects/demo/src/app/pages/loading/loading.component.ts` | Same pattern |
| `projects/demo/src/app/i18n/translations.ts` | Add ~200 new keys for docs content, code labels, TOC, sidebar |
| `projects/demo/src/styles.scss` | Update global styles for docs layout |

---

## Task 1: Create Shared CodePreview Component

**Files:**
- Create: `projects/demo/src/app/shared/code-preview.component.ts`

This is the core building block — a tabbed container showing "Visual" (live component) and "Code" (Angular source) views, exactly like the DGA site's Live Demo section.

- [ ] **Step 1.1: Create the CodePreview component**

```typescript
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
```

- [ ] **Step 1.2: Build to verify**

Run: `npx ng build demo --configuration production --base-href /dga-angular-template/`
Expected: Clean build, no errors

- [ ] **Step 1.3: Commit**

```bash
git add projects/demo/src/app/shared/code-preview.component.ts
git commit -m "feat: add CodePreview component with Visual/Code tab toggle"
```

---

## Task 2: Create SectionHeader Component

**Files:**
- Create: `projects/demo/src/app/shared/section-header.component.ts`

Reusable bilingual section heading used on every component page.

- [ ] **Step 2.1: Create the SectionHeader component**

```typescript
// projects/demo/src/app/shared/section-header.component.ts
import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="docs-section-header" [id]="anchorId()">
      <h2 class="docs-section-header__title">{{ title() }}</h2>
      @if (description()) {
        <p class="docs-section-header__desc">{{ description() }}</p>
      }
    </div>
  `,
  styles: `
    .docs-section-header {
      margin-bottom: var(--dga-spacing-lg, 24px);
      scroll-margin-top: 80px;
    }

    .docs-section-header__title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--dga-neutral-color-900, #111827);
      margin: 0 0 var(--dga-spacing-xs, 8px);
    }

    .docs-section-header__desc {
      font-size: 0.95rem;
      color: var(--dga-neutral-color-500, #6b7280);
      margin: 0;
      line-height: 1.7;
      max-width: 680px;
    }
  `,
})
export class SectionHeaderComponent {
  readonly title = input.required<string>();
  readonly description = input<string>('');
  readonly anchorId = input<string>('');
}
```

- [ ] **Step 2.2: Build and commit**

```bash
git add projects/demo/src/app/shared/section-header.component.ts
git commit -m "feat: add SectionHeader component for docs pages"
```

---

## Task 3: Create DocsLayout — Sidebar + Main Content + TOC Shell

**Files:**
- Create: `projects/demo/src/app/layout/docs-layout.component.ts`
- Create: `projects/demo/src/app/layout/docs-sidebar.component.ts`
- Create: `projects/demo/src/app/layout/docs-toc.component.ts`

The main layout shell that replaces the current header-nav pattern. Matches the DGA site:
- Left: collapsible sidebar with component tree
- Center: main content (router-outlet)
- Right: optional "On this page" TOC
- Top: minimal header with logo, version, language toggle

- [ ] **Step 3.1: Create DocsSidebar component**

```typescript
// projects/demo/src/app/layout/docs-sidebar.component.ts
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
```

- [ ] **Step 3.2: Create DocsToc component**

```typescript
// projects/demo/src/app/layout/docs-toc.component.ts
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
```

- [ ] **Step 3.3: Create DocsLayout component**

```typescript
// projects/demo/src/app/layout/docs-layout.component.ts
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
```

- [ ] **Step 3.4: Build and commit**

```bash
git add projects/demo/src/app/layout/
git commit -m "feat: add DocsLayout with sidebar navigation and TOC"
```

---

## Task 4: Update App Shell and Routing

**Files:**
- Modify: `projects/demo/src/app/app.ts`
- Modify: `projects/demo/src/app/app.html`
- Modify: `projects/demo/src/app/app.scss`
- Modify: `projects/demo/src/app/app.routes.ts`
- Modify: `projects/demo/src/styles.scss`

Replace header/footer shell with DocsLayout. Nest all component routes under the layout.

- [ ] **Step 4.1: Rewrite app.routes.ts**

Wrap all component/template routes as children of a route that uses `DocsLayoutComponent` as its component. The home route is also a child.

```typescript
// projects/demo/src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/docs-layout.component').then(m => m.DocsLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
      },
      {
        path: 'buttons',
        loadComponent: () => import('./pages/buttons/buttons.component').then(m => m.ButtonsComponent),
      },
      // ... all other component and template routes (same lazy imports as before)
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
```

- [ ] **Step 4.2: Simplify app.ts**

Remove DgaHeaderComponent/DgaFooterComponent imports, navItems, footerColumns, href helper. Keep only language/theme signal logic and TranslationService.

- [ ] **Step 4.3: Simplify app.html**

```html
<router-outlet />
```

- [ ] **Step 4.4: Simplify app.scss**

Remove all old styles (accent line, demo-main, demo-container). Just keep empty or minimal resets.

- [ ] **Step 4.5: Update styles.scss global styles**

Remove old `demo-page__header`, `demo-page__title-ar/en` classes. Add new docs-specific global styles for page layout, typography, and the content area. Keep `demo-preview`, `demo-row`, `demo-stack`, `demo-grid`, `demo-form-grid` helpers.

- [ ] **Step 4.6: Build and verify**

Run: `npx ng build demo --configuration production --base-href /dga-angular-template/`
Expected: Clean build. App renders with sidebar layout.

- [ ] **Step 4.7: Commit**

```bash
git add projects/demo/src/app/app.ts projects/demo/src/app/app.html projects/demo/src/app/app.scss projects/demo/src/app/app.routes.ts projects/demo/src/styles.scss
git commit -m "feat: replace header-nav shell with docs sidebar layout"
```

---

## Task 5: Update i18n Translations

**Files:**
- Modify: `projects/demo/src/app/i18n/translations.ts`

Add all new translation keys for:
- Sidebar navigation labels (~20 keys)
- Docs TOC "on this page" heading
- Code preview tab labels (Visual/Code)
- Per-component-page section headings (Live Demo, Appearance, Types, Styles, States, Code, Accessibility)
- Component descriptions and content
- Storybook link text

Each key needs both AR and EN values. Approximately 200+ new keys.

- [ ] **Step 5.1: Add sidebar translation keys**

Add to both AR and EN objects:
```
sidebar.home, sidebar.components, sidebar.templates
sidebar.buttons, sidebar.forms, sidebar.cards, sidebar.tables
sidebar.navigation, sidebar.feedback, sidebar.loading
sidebar.tpl.dashboard, sidebar.tpl.login, sidebar.tpl.register
sidebar.tpl.dataList, sidebar.tpl.settings
```

- [ ] **Step 5.2: Add docs page translation keys**

For each component page, add keys for:
```
{page}.title          — page heading
{page}.description    — intro paragraph
{page}.liveDemo       — "Live Demo" / "تجربة مباشرة"
{page}.code           — "Code" / "الكود"
{page}.visual         — "Visual" / "الواجهة المرئية"
{page}.appearance     — "Appearance" / "المظهر"
{page}.types          — "Types" / "الأنواع"
{page}.styles         — "Styles" / "الأنماط"
{page}.states         — "States" / "الحالات"
{page}.accessibility  — "Accessibility" / "إمكانية الوصول"
{page}.onThisPage     — "On this page" / "في هذه الصفحة"
```

- [ ] **Step 5.3: Build and commit**

```bash
git add projects/demo/src/app/i18n/translations.ts
git commit -m "feat: add ~200 i18n keys for docs layout and component pages"
```

---

## Task 6: Rewrite Buttons Page (Reference Implementation)

**Files:**
- Modify: `projects/demo/src/app/pages/buttons/buttons.component.ts`

This is the reference implementation — all other pages will follow this pattern. Matches the DGA site's Buttons page:

1. **Page header**: title + description
2. **Live Demo**: CodePreview with Visual (live button) + Code (Angular import/usage)
3. **Appearance > Types**: description + each variant shown
4. **Styles**: variant grid showing all button styles
5. **States**: disabled, loading, etc.
6. **Accessibility**: notes about ARIA, keyboard support

Right-side TOC with section links.

- [ ] **Step 6.1: Rewrite buttons component**

The component should:
- Import: `DgaButtonComponent`, `CodePreviewComponent`, `SectionHeaderComponent`, `DocsTocComponent`, `TranslationService`
- Template: page title → Live Demo (CodePreview) → Appearance sections → States → Code section → Accessibility
- Code strings: Show actual Angular code for importing and using `<dga-button>`
- TOC items computed from i18n keys

- [ ] **Step 6.2: Build and verify visually**

Run dev server: `npx ng serve demo`
Navigate to `/buttons` — verify sidebar layout, live demo tab toggle, code display

- [ ] **Step 6.3: Commit**

```bash
git add projects/demo/src/app/pages/buttons/buttons.component.ts
git commit -m "feat: rewrite buttons page with DGA docs pattern — live demo + code tabs"
```

---

## Task 7: Rewrite Remaining 6 Component Pages (Parallel)

**Files:**
- Modify: `projects/demo/src/app/pages/forms/forms.component.ts`
- Modify: `projects/demo/src/app/pages/cards/cards.component.ts`
- Modify: `projects/demo/src/app/pages/tables/tables.component.ts`
- Modify: `projects/demo/src/app/pages/navigation/navigation.component.ts`
- Modify: `projects/demo/src/app/pages/feedback/feedback.component.ts`
- Modify: `projects/demo/src/app/pages/loading/loading.component.ts`

Follow the same pattern as Task 6 (Buttons). Each page gets:
1. Page header (title + description)
2. Live Demo with CodePreview (Visual/Code tabs)
3. Component sections showing variants, sizes, states
4. Angular code examples
5. Right-side TOC

**Can be parallelized** — dispatch 3 agents, each handling 2 pages.

- [ ] **Step 7.1: Rewrite forms + cards pages**
- [ ] **Step 7.2: Rewrite tables + navigation pages**
- [ ] **Step 7.3: Rewrite feedback + loading pages**
- [ ] **Step 7.4: Build all and verify**
- [ ] **Step 7.5: Commit**

```bash
git add projects/demo/src/app/pages/
git commit -m "feat: rewrite all component pages with DGA docs pattern"
```

---

## Task 8: Rewrite Home Page

**Files:**
- Modify: `projects/demo/src/app/pages/home/home.component.ts`

The home page within the docs layout. Should be a welcome/overview page (not a hero section since we're now in a sidebar layout). Show:
- Welcome heading + description
- Quick-start code snippet (install + import)
- Component overview cards linking to each page

- [ ] **Step 8.1: Rewrite home component**
- [ ] **Step 8.2: Build and commit**

---

## Task 9: Build, Test, Push

- [ ] **Step 9.1: Production build**

```bash
npx ng build demo --configuration production --base-href /dga-angular-template/
```

- [ ] **Step 9.2: Verify all routes work**

Check: /, /buttons, /forms, /cards, /tables, /navigation, /feedback, /loading, /templates/dashboard

- [ ] **Step 9.3: Verify language toggle**

Switch AR → EN and back. All sidebar labels, page content, code labels should switch.

- [ ] **Step 9.4: Commit and push**

```bash
git add -A
git commit -m "feat: complete DGA docs-style demo redesign with sidebar, live demos, code tabs, AR/EN"
git push origin feature/phase-4-nav-feedback
```

---

## Key Implementation Notes

1. **Routing & base-href**: All `routerLink` paths work with Angular's `<base href>`. No need for manual prefix — Angular router handles it. Only plain `[href]` attributes (as in the old DgaHeaderComponent) need the prefix. The new sidebar uses `routerLink` so this is no longer an issue.

2. **Code examples**: Each page shows Angular import/usage code. The code is a plain string passed to `CodePreviewComponent.code` input. Use template literals for the code content. Always show the Angular version (not React from the DGA site).

3. **Language switching**: The sidebar's language button calls `TranslationService.setLang()`. The `App` component's effect on `currentLang` updates `document.dir` and `document.lang`. The sidebar also needs to listen to `App`'s lang changes — use the shared `TranslationService.lang` signal.

4. **Responsive**: On mobile (< 768px), the sidebar collapses. Consider adding a hamburger toggle. The TOC hides on mobile.

5. **DGA component library**: The library's `DgaHeaderComponent` and `DgaFooterComponent` are no longer used in the app shell (they're library exports for consumers). The demo now uses its own sidebar layout.
