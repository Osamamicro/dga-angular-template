# DGA Angular Template - Design Specification

**Date**: 2026-04-01
**Status**: Approved
**Author**: Osama Ahmed

---

## 1. Overview

**dga-angular-template** is an open-source Angular starter template implementing the Saudi Digital Government Authority (DGA) National Design System ("Platforms Code" / كود المنصات). Any Saudi government entity can use it to build WCAG AA-compliant, RTL-first web applications.

### Goals
- Full DGA design system compliance (53-checkpoint checklist)
- Production-ready Angular 20+ component library publishable to npm
- Arabic-first (RTL) with English (LTR) support
- WCAG AA accessibility built into every component
- Dark mode support via semantic tokens
- Comprehensive documentation via Storybook 8

### Non-Goals
- Backend/API integration (this is a frontend template only)
- Hijri date picker in Phase 1 (complex — deferred to Phase 5)
- Server-side rendering (SSR) — can be added later
- E2E testing (unit tests only in initial scope)

---

## 2. Architecture

### 2.1 Workspace Structure

```
dga-angular-template/
├── projects/
│   ├── dga-components/          # Angular library (publishable)
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── tokens/      # Design token CSS/SCSS files
│   │   │   │   ├── button/      # Each component in its own folder
│   │   │   │   ├── input/
│   │   │   │   ├── select/
│   │   │   │   ├── ...
│   │   │   │   └── index.ts     # Public API barrel export
│   │   │   ├── styles/
│   │   │   │   ├── _tokens.scss         # All token definitions
│   │   │   │   ├── _mixins.scss         # Shared mixins (direction, responsive, buttons, forms)
│   │   │   │   ├── _config.scss         # $prefix: 'dga-'
│   │   │   │   ├── _reset.scss          # Minimal reset/normalize
│   │   │   │   └── dga-components.scss  # Entry point (imports all)
│   │   │   └── public-api.ts
│   │   ├── ng-package.json
│   │   └── package.json
│   └── demo/                    # Demo application
│       ├── src/
│       │   ├── app/
│       │   │   ├── pages/
│       │   │   │   ├── home/
│       │   │   │   ├── showcase/        # Component playground
│       │   │   │   ├── templates/       # Page template demos
│       │   │   │   └── ...
│       │   │   ├── shared/
│       │   │   │   ├── header/
│       │   │   │   ├── footer/
│       │   │   │   └── theme-switcher/
│       │   │   ├── app.routes.ts
│       │   │   └── app.component.ts
│       │   ├── assets/
│       │   │   └── i18n/
│       │   │       ├── ar.json
│       │   │       └── en.json
│       │   └── styles.scss
│       └── project.json
├── .storybook/                  # Storybook 8 config
├── .github/
│   └── workflows/
│       ├── ci.yml               # Lint, test, build on PR
│       └── publish.yml          # npm publish on release tag
├── .eslintrc.json
├── .prettierrc
├── angular.json
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── README.md                    # Arabic + English
├── CONTRIBUTING.md
├── LICENSE                      # MIT
└── CHANGELOG.md
```

### 2.2 Key Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Workspace type | Angular CLI workspace | Standard, well-supported for libraries |
| Library format | ng-packagr (Angular library) | Publishable to npm, tree-shakable |
| Styling approach | SCSS + CSS custom properties | Matches DGA spec, themeable at runtime |
| Tailwind CSS | v4, configured with DGA tokens | Utility classes for demo app, not required by library consumers |
| Component architecture | Standalone, OnPush, signals | Angular 20 best practices |
| Form controls | ControlValueAccessor | Works with both template-driven and reactive forms |
| Encapsulation | ViewEncapsulation.None for library components | Global styles, matches DGA pattern |
| Testing | Karma + Jasmine | Matches existing GACA toolchain |
| Documentation | Storybook 8 | Industry standard, interactive docs |
| i18n | Simple JSON-based service | Lightweight, no heavy i18n framework needed |

### 2.3 Token Architecture

Tokens are organized in three layers:

```
Primitive → Alias → Component
```

- **Primitive**: Raw values (`sa-600: #1B8354`, `4px`, `16px`)
- **Alias**: Semantic names (`--dga-primary-color-600`, `--dga-spacing-md`)
- **Component**: Component-scoped (`--dga-btn-bg`, `--dga-input-border-color`)

All tokens exported as:
1. **CSS custom properties** (`:root` — runtime theming)
2. **SCSS variables** (build-time usage in library)
3. **JSON** (programmatic access, Tailwind config)

Dark mode: override alias tokens under `[data-theme="dark"]` selector.

### 2.4 Component API Pattern

Every component follows this structure:

```typescript
// Types exported separately
export type DgaButtonVariant = 'primary' | 'secondary' | 'outline' | ...;
export type DgaButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'dga-button',
  standalone: true,
  imports: [],
  templateUrl: './dga-button.component.html',
  styleUrl: './dga-button.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgaButtonComponent {
  // Inputs as signals (Angular 20)
  variant = input<DgaButtonVariant>('primary');
  size = input<DgaButtonSize>('lg');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  ariaLabel = input<string | undefined>(undefined);

  // Computed classes
  buttonClasses = computed(() => {
    const classes = ['dga-btn', `dga-btn-${this.variant()}`];
    if (this.size() !== 'lg') classes.push(`dga-btn-${this.size()}`);
    if (this.loading()) classes.push('dga-btn--loading');
    return classes.join(' ');
  });
}
```

Form components additionally implement `ControlValueAccessor` with `forwardRef`.

### 2.5 SCSS Pattern

```scss
@use '../styles/config' as *;
@use '../styles/mixins' as *;

.#{$prefix}btn {
  --#{$prefix}btn-bg: var(--#{$prefix}primary-color-600);
  --#{$prefix}btn-color: var(--#{$prefix}white-default-color);
  --#{$prefix}btn-height: var(--#{$prefix}controls-height-lg);

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--#{$prefix}spacing-sm);
  min-height: var(--#{$prefix}btn-height);
  min-width: 44px;  // Touch target
  padding-inline: var(--#{$prefix}spacing-xl);
  background: var(--#{$prefix}btn-bg);
  color: var(--#{$prefix}btn-color);
  border-radius: var(--#{$prefix}radius-md);
  font-family: var(--#{$prefix}font-family-medium);
  font-size: var(--#{$prefix}text-md-font-size);
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;

  &:focus-visible {
    outline: 2px solid var(--#{$prefix}primary-color-600);
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition-duration: 0.01ms;
  }
}
```

---

## 3. Component Inventory

### Priority 1 — Foundation (Phase 2-3)
| # | Component | Type | CVA | Priority |
|---|-----------|------|-----|----------|
| 1 | Button | Action | No | P1 |
| 2 | Input | Form | Yes | P1 |
| 3 | Textarea | Form | Yes | P1 |
| 4 | Select | Form | Yes | P1 |
| 5 | Checkbox | Form | Yes | P1 |
| 6 | Radio | Form | Yes | P1 |
| 7 | Toggle/Switch | Form | Yes | P1 |
| 8 | Card | Content | No | P1 |
| 9 | Badge/Tag | Content | No | P1 |
| 10 | Alert | Feedback | No | P1 |

### Priority 2 — Structure (Phase 3-4)
| # | Component | Type | CVA | Priority |
|---|-----------|------|-----|----------|
| 11 | Accordion | Content | No | P2 |
| 12 | Tabs | Navigation | No | P2 |
| 13 | Table | Data | No | P2 |
| 14 | Modal/Dialog | Feedback | No | P2 |
| 15 | Breadcrumb | Navigation | No | P2 |
| 16 | Pagination | Navigation | No | P2 |
| 17 | Stepper | Navigation | No | P2 |

### Priority 3 — Enhancement (Phase 4-5)
| # | Component | Type | CVA | Priority |
|---|-----------|------|-----|----------|
| 18 | Tooltip | Feedback | No | P3 |
| 19 | Popover | Feedback | No | P3 |
| 20 | Avatar | Content | No | P3 |
| 21 | Spinner | Loading | No | P3 |
| 22 | Progress Bar | Loading | No | P3 |
| 23 | Skeleton | Loading | No | P3 |
| 24 | File Upload | Form | No | P3 |
| 25 | Date Picker | Form | Yes | P3 |
| 26 | Sidebar Nav | Navigation | No | P3 |
| 27 | Top Nav / Header | Navigation | No | P3 |
| 28 | Footer | Navigation | No | P3 |

---

## 4. Accessibility Contract

Every component guarantees:
- Semantic HTML elements (`<button>`, `<input>`, `<a>`, `<nav>`, not clickable `<div>`s)
- Correct ARIA roles and attributes per DGA spec
- `:focus-visible` ring (2px solid, 2px offset)
- Keyboard navigation (Tab, Enter, Space, Escape, Arrows)
- 44x44px minimum touch targets
- 4.5:1 text contrast, 3:1 UI component contrast
- `@media (prefers-reduced-motion: reduce)` support
- `@media (prefers-contrast: high)` support
- `@media (forced-colors: active)` support
- Screen reader tested descriptions

---

## 5. Dark Mode Strategy

- Alias tokens define light mode defaults in `:root`
- Dark overrides under `[data-theme="dark"]` selector
- Components use alias tokens only — never primitive values
- Toggle via `document.documentElement.setAttribute('data-theme', 'dark')`
- Respects `prefers-color-scheme` as initial value

---

## 6. RTL Strategy

- `<html dir="rtl" lang="ar">` as default
- Logical CSS properties preferred (`margin-inline-start`, `padding-inline-end`)
- `@include dir("rtl")` mixin for cases needing explicit overrides
- Arrow keys reverse in RTL (Left = next, Right = previous)
- Directional icons flip; decorative icons do not
- `text-align: start` / `end` instead of `left` / `right`

