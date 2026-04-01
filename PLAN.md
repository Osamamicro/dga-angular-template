# DGA Angular Template - Implementation Plan

**Last Updated**: 2026-04-01
**Design Spec**: [docs/superpowers/specs/2026-04-01-dga-angular-template-design.md](docs/superpowers/specs/2026-04-01-dga-angular-template-design.md)

---

## Progress Legend

- [ ] Not started
- [~] In progress
- [x] Completed

---

## Phase 1: Project Scaffold & Design Tokens
**Goal**: Working Angular workspace with library project, all DGA tokens, and build passing.
**Branch**: `feature/phase-1-scaffold-tokens`

### 1.1 Project Scaffold
- [ ] 1.1.1 Create Angular 20 workspace (`ng new dga-angular-template --no-create-application`)
- [ ] 1.1.2 Generate library project (`ng generate library dga-components`)
- [ ] 1.1.3 Generate demo application (`ng generate application demo`)
- [ ] 1.1.4 Configure `angular.json` — paths, build options, SCSS
- [ ] 1.1.5 Configure `tsconfig.json` — strict mode, path aliases (`@dga/components`)
- [ ] 1.1.6 Add Tailwind CSS 4 with DGA token integration
- [ ] 1.1.7 Add ESLint + Prettier configuration
- [ ] 1.1.8 Add `.editorconfig`, `.gitignore`, `.npmrc`
- [ ] 1.1.9 Create `LICENSE` (MIT), `README.md` (Arabic + English stub)
- [ ] 1.1.10 Initialize git repo, first commit

### 1.2 Design Tokens
- [ ] 1.2.1 Create `_config.scss` — `$prefix: 'dga-'`, base configuration
- [ ] 1.2.2 Create primitive color tokens (8 palettes x 12 shades each)
  - Primary (Saudi Green), Secondary (Gold), Tertiary (Lavender)
  - Neutral (Gray), Error, Warning, Success, Info
- [ ] 1.2.3 Create alias color tokens mapping primitives to semantic names
- [ ] 1.2.4 Create typography tokens (IBM Plex Sans Arabic, sizes, weights, line heights)
- [ ] 1.2.5 Create spacing tokens (0 through 11xl, 4px base)
- [ ] 1.2.6 Create shadow tokens (xs through 3xl + backdrop blur)
- [ ] 1.2.7 Create border-radius tokens (none, xs, sm, md, lg, xl, full)
- [ ] 1.2.8 Create breakpoint tokens and responsive mixin
- [ ] 1.2.9 Create width tokens
- [ ] 1.2.10 Create dark mode token overrides (`[data-theme="dark"]`)
- [ ] 1.2.11 Create `dga-components.scss` entry point importing all tokens
- [ ] 1.2.12 Export tokens as JSON for programmatic use
- [ ] 1.2.13 Configure Tailwind to use DGA tokens

### 1.3 Shared Mixins
- [ ] 1.3.1 Create `_direction.scss` — RTL/LTR mixin (`@include dir("rtl")`)
- [ ] 1.3.2 Create `_responsive.scss` — breakpoint mixin (`@include respond("phone")`)
- [ ] 1.3.3 Create `_buttons.scss` — button state mixin
- [ ] 1.3.4 Create `_forms.scss` — form control base mixin
- [ ] 1.3.5 Create `_accessibility.scss` — focus ring, reduced-motion, forced-colors mixins

### 1.4 Validation
- [ ] 1.4.1 `ng build dga-components` succeeds
- [ ] 1.4.2 `ng build demo` succeeds
- [ ] 1.4.3 Demo app renders with DGA tokens loaded (verify CSS custom properties in browser)
- [ ] 1.4.4 Commit and tag: `phase-1-complete`

---

## Phase 2: Core Form Components
**Goal**: Button + all form input components with CVA, tests, and accessibility.
**Branch**: `feature/phase-2-core-forms`
**Depends on**: Phase 1

### 2.1 Button Component
- [ ] 2.1.1 Create `dga-button` component (standalone, OnPush, ViewEncapsulation.None)
- [ ] 2.1.2 Implement variants: primary, secondary, outline, ghost, danger, icon-only, tertiary
- [ ] 2.1.3 Implement sizes: sm, md, lg
- [ ] 2.1.4 Implement states: default, hover, pressed, focused, disabled, loading
- [ ] 2.1.5 Add ARIA: `aria-label` for icon-only, `aria-disabled`, `aria-busy` for loading
- [ ] 2.1.6 Add keyboard support (Enter, Space)
- [ ] 2.1.7 Add RTL support
- [ ] 2.1.8 Add dark mode styles
- [ ] 2.1.9 Write unit tests (all variants, states, accessibility)
- [ ] 2.1.10 Export types and component from public API

### 2.2 Input Component
- [ ] 2.2.1 Create `dga-input` component with ControlValueAccessor
- [ ] 2.2.2 Implement types: text, number, email, password, search
- [ ] 2.2.3 Implement features: label, placeholder, helper text, error message, character count, clear button
- [ ] 2.2.4 Implement states: default, hover, focused, error, disabled, readonly
- [ ] 2.2.5 Implement sizes: sm, md, lg
- [ ] 2.2.6 Add prefix/suffix icon slots
- [ ] 2.2.7 Add ARIA: `aria-describedby`, `aria-invalid`, `aria-required`, label linkage
- [ ] 2.2.8 Add RTL + dark mode
- [ ] 2.2.9 Write unit tests
- [ ] 2.2.10 Export from public API

### 2.3 Textarea Component
- [ ] 2.3.1 Create `dga-textarea` component with ControlValueAccessor
- [ ] 2.3.2 Implement features: auto-resize, character count, min/max rows
- [ ] 2.3.3 Implement states: default, hover, focused, error, disabled
- [ ] 2.3.4 Add ARIA attributes
- [ ] 2.3.5 Add RTL + dark mode
- [ ] 2.3.6 Write unit tests
- [ ] 2.3.7 Export from public API

### 2.4 Select Component
- [ ] 2.4.1 Create `dga-select` component with ControlValueAccessor
- [ ] 2.4.2 Implement features: single select, searchable, option groups, placeholder, clear
- [ ] 2.4.3 Implement states: default, hover, focused, error, disabled, open
- [ ] 2.4.4 Add keyboard navigation: arrow keys, Enter, Escape, type-ahead
- [ ] 2.4.5 Add ARIA: `role="combobox"`, `aria-expanded`, `aria-activedescendant`, `role="listbox"`
- [ ] 2.4.6 Add RTL + dark mode
- [ ] 2.4.7 Write unit tests
- [ ] 2.4.8 Export from public API

### 2.5 Checkbox Component
- [ ] 2.5.1 Create `dga-checkbox` component with ControlValueAccessor
- [ ] 2.5.2 Implement states: unchecked, checked, indeterminate, hover, focused, disabled
- [ ] 2.5.3 Add ARIA: `role="checkbox"`, `aria-checked` (true/false/mixed)
- [ ] 2.5.4 Add RTL + dark mode
- [ ] 2.5.5 Write unit tests
- [ ] 2.5.6 Export from public API

### 2.6 Radio Component
- [ ] 2.6.1 Create `dga-radio-group` and `dga-radio` components with ControlValueAccessor
- [ ] 2.6.2 Implement group behavior: single selection, arrow key navigation
- [ ] 2.6.3 Add ARIA: `role="radiogroup"`, `role="radio"`, `aria-checked`
- [ ] 2.6.4 Add RTL + dark mode
- [ ] 2.6.5 Write unit tests
- [ ] 2.6.6 Export from public API

### 2.7 Toggle/Switch Component
- [ ] 2.7.1 Create `dga-switch` component with ControlValueAccessor
- [ ] 2.7.2 Implement states: on, off, hover, focused, disabled
- [ ] 2.7.3 Add ARIA: `role="switch"`, `aria-checked`
- [ ] 2.7.4 Add RTL + dark mode
- [ ] 2.7.5 Write unit tests
- [ ] 2.7.6 Export from public API

### 2.8 Validation
- [ ] 2.8.1 All form components work with Angular reactive forms
- [ ] 2.8.2 All form components work with template-driven forms
- [ ] 2.8.3 All unit tests pass
- [ ] 2.8.4 Library builds without errors
- [ ] 2.8.5 Commit and tag: `phase-2-complete`

---

## Phase 3: Content & Data Components
**Goal**: Card, Badge, Alert, Accordion, Tabs, Table — all with tests and accessibility.
**Branch**: `feature/phase-3-content-data`
**Depends on**: Phase 1

### 3.1 Card Component
- [ ] 3.1.1 Create `dga-card` component with content projection slots (header, body, media, actions, footer)
- [ ] 3.1.2 Implement variants: flat, shadow, outlined
- [ ] 3.1.3 Implement types: default, expandable, selectable, interactive
- [ ] 3.1.4 Add ARIA: `role="article"`, focusable when interactive
- [ ] 3.1.5 Add RTL + dark mode
- [ ] 3.1.6 Write unit tests
- [ ] 3.1.7 Export from public API

### 3.2 Badge/Tag Component
- [ ] 3.2.1 Create `dga-tag` component
- [ ] 3.2.2 Implement styles: subtle, outline, inverted, ghost, filled
- [ ] 3.2.3 Implement colors: 6 color options (primary, secondary, success, warning, danger, info)
- [ ] 3.2.4 Implement features: removable (with dismiss button), clickable, read-only
- [ ] 3.2.5 Add ARIA: dismiss button `aria-label`
- [ ] 3.2.6 Add RTL + dark mode
- [ ] 3.2.7 Write unit tests
- [ ] 3.2.8 Export from public API

### 3.3 Alert Component
- [ ] 3.3.1 Create `dga-alert` component
- [ ] 3.3.2 Implement types: inline, toast, banner
- [ ] 3.3.3 Implement severity: info, success, warning, error, neutral
- [ ] 3.3.4 Implement features: dismissible, action button, auto-dismiss (min 5s)
- [ ] 3.3.5 Add ARIA: `role="alert"` / `role="status"`, `aria-live`
- [ ] 3.3.6 Add RTL + dark mode
- [ ] 3.3.7 Write unit tests
- [ ] 3.3.8 Export from public API

### 3.4 Accordion Component
- [ ] 3.4.1 Create `dga-accordion` and `dga-accordion-item` components
- [ ] 3.4.2 Implement modes: single expand, multi expand
- [ ] 3.4.3 Implement states: collapsed, expanded, hover, focused, disabled
- [ ] 3.4.4 Add ARIA: `aria-expanded`, `aria-controls`, `role="region"` on panel
- [ ] 3.4.5 Add keyboard: Enter/Space to toggle
- [ ] 3.4.6 Add RTL + dark mode
- [ ] 3.4.7 Write unit tests
- [ ] 3.4.8 Export from public API

### 3.5 Tabs Component
- [ ] 3.5.1 Create `dga-tabs` and `dga-tab` components
- [ ] 3.5.2 Implement orientations: horizontal, vertical
- [ ] 3.5.3 Implement features: icons, disabled tabs, lazy content loading
- [ ] 3.5.4 Add ARIA: `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`
- [ ] 3.5.5 Add keyboard: Arrow keys (reversed in RTL), Home/End
- [ ] 3.5.6 Add RTL + dark mode
- [ ] 3.5.7 Write unit tests
- [ ] 3.5.8 Export from public API

### 3.6 Table Component
- [ ] 3.6.1 Create `dga-table` component
- [ ] 3.6.2 Implement features: sortable columns, row selection (checkbox), sticky header
- [ ] 3.6.3 Implement variants: default, striped, compact, bordered
- [ ] 3.6.4 Implement responsive: horizontal scroll on mobile
- [ ] 3.6.5 Add ARIA: `<table>`, `<thead>`, `<tbody>`, `scope`, `aria-sort`, `aria-selected`
- [ ] 3.6.6 Add RTL + dark mode
- [ ] 3.6.7 Write unit tests
- [ ] 3.6.8 Export from public API

### 3.7 Validation
- [ ] 3.7.1 All unit tests pass
- [ ] 3.7.2 Library builds without errors
- [ ] 3.7.3 Commit and tag: `phase-3-complete`

---

## Phase 4: Navigation & Feedback Components
**Goal**: Modal, Breadcrumb, Pagination, Stepper, Tooltip, Popover — all with tests.
**Branch**: `feature/phase-4-nav-feedback`
**Depends on**: Phase 1

### 4.1 Modal/Dialog Component
- [ ] 4.1.1 Create `dga-modal` component
- [ ] 4.1.2 Implement types: confirmation, form, fullscreen
- [ ] 4.1.3 Implement features: overlay backdrop, close button, scrollable content, action buttons
- [ ] 4.1.4 Add focus trapping (Tab cycles within modal)
- [ ] 4.1.5 Add ARIA: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
- [ ] 4.1.6 Add keyboard: Escape to close, return focus to trigger
- [ ] 4.1.7 Prevent background scroll when open
- [ ] 4.1.8 Add RTL + dark mode
- [ ] 4.1.9 Write unit tests
- [ ] 4.1.10 Export from public API

### 4.2 Breadcrumb Component
- [ ] 4.2.1 Create `dga-breadcrumb` and `dga-breadcrumb-item` components
- [ ] 4.2.2 Implement features: max 5 visible items, truncation with ellipsis
- [ ] 4.2.3 Implement responsive: full (desktop), truncated (tablet), back-link (mobile)
- [ ] 4.2.4 Add ARIA: `<nav aria-label="Breadcrumb">`, `<ol>`, `aria-current="page"`
- [ ] 4.2.5 Add RTL + dark mode
- [ ] 4.2.6 Write unit tests
- [ ] 4.2.7 Export from public API

### 4.3 Pagination Component
- [ ] 4.3.1 Create `dga-pagination` component
- [ ] 4.3.2 Implement features: page numbers, prev/next, items per page selector, total count
- [ ] 4.3.3 Add ARIA: `<nav aria-label="Pagination">`, `aria-current="page"`, button labels
- [ ] 4.3.4 Add keyboard navigation
- [ ] 4.3.5 Add RTL + dark mode
- [ ] 4.3.6 Write unit tests
- [ ] 4.3.7 Export from public API

### 4.4 Stepper/Wizard Component
- [ ] 4.4.1 Create `dga-stepper` and `dga-step` components
- [ ] 4.4.2 Implement orientations: horizontal (desktop), vertical (mobile)
- [ ] 4.4.3 Implement states: completed, current, upcoming, error
- [ ] 4.4.4 Implement features: clickable steps, connecting line, step icons
- [ ] 4.4.5 Add ARIA: `aria-current="step"`, `role="list"`
- [ ] 4.4.6 Add RTL + dark mode
- [ ] 4.4.7 Write unit tests
- [ ] 4.4.8 Export from public API

### 4.5 Tooltip Component
- [ ] 4.5.1 Create `dga-tooltip` directive
- [ ] 4.5.2 Implement positions: top, bottom, left, right, top-start, top-end
- [ ] 4.5.3 Add ARIA: `role="tooltip"`, `aria-describedby`
- [ ] 4.5.4 Show on hover + focus, dismiss with Escape
- [ ] 4.5.5 Add RTL + dark mode
- [ ] 4.5.6 Write unit tests
- [ ] 4.5.7 Export from public API

### 4.6 Popover Component
- [ ] 4.6.1 Create `dga-popover` component
- [ ] 4.6.2 Implement features: trigger on click, close on outside click/Escape
- [ ] 4.6.3 Implement positioning: auto-flip based on viewport
- [ ] 4.6.4 Add ARIA attributes and focus management
- [ ] 4.6.5 Add RTL + dark mode
- [ ] 4.6.6 Write unit tests
- [ ] 4.6.7 Export from public API

### 4.7 Validation
- [ ] 4.7.1 All unit tests pass
- [ ] 4.7.2 Library builds without errors
- [ ] 4.7.3 Commit and tag: `phase-4-complete`

---

## Phase 5: Advanced Components
**Goal**: File Upload, Date Picker, loading states, shell components.
**Branch**: `feature/phase-5-advanced`
**Depends on**: Phase 1-2

### 5.1 Avatar Component
- [ ] 5.1.1 Create `dga-avatar` component
- [ ] 5.1.2 Implement types: image, initials, icon
- [ ] 5.1.3 Implement sizes: 24px through 120px
- [ ] 5.1.4 Implement features: avatar groups with overlap, status indicator
- [ ] 5.1.5 Add ARIA: `alt` text, `aria-label`
- [ ] 5.1.6 Add RTL + dark mode
- [ ] 5.1.7 Write unit tests
- [ ] 5.1.8 Export from public API

### 5.2 Spinner Component
- [ ] 5.2.1 Create `dga-spinner` component
- [ ] 5.2.2 Implement sizes and color variants
- [ ] 5.2.3 Add ARIA: `role="status"`, `aria-label="جاري التحميل"`
- [ ] 5.2.4 Add `prefers-reduced-motion` support
- [ ] 5.2.5 Write unit tests
- [ ] 5.2.6 Export from public API

### 5.3 Progress Bar Component
- [ ] 5.3.1 Create `dga-progress-bar` component
- [ ] 5.3.2 Implement features: determinate, indeterminate, label, color variants
- [ ] 5.3.3 Add ARIA: `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- [ ] 5.3.4 Add RTL + dark mode
- [ ] 5.3.5 Write unit tests
- [ ] 5.3.6 Export from public API

### 5.4 Skeleton Component
- [ ] 5.4.1 Create `dga-skeleton` component
- [ ] 5.4.2 Implement types: circle, line, rectangle, square
- [ ] 5.4.3 Add ARIA: `aria-busy="true"`, `aria-hidden="true"`
- [ ] 5.4.4 Add `prefers-reduced-motion` support (no shimmer animation)
- [ ] 5.4.5 Write unit tests
- [ ] 5.4.6 Export from public API

### 5.5 File Upload Component
- [ ] 5.5.1 Create `dga-file-upload` component
- [ ] 5.5.2 Implement features: drag & drop zone, file type validation, size limits, multiple files
- [ ] 5.5.3 Implement features: progress indicator, file preview (images), file list with remove
- [ ] 5.5.4 Add ARIA: `<input type="file">`, `aria-label`, progress `role="progressbar"`
- [ ] 5.5.5 Add keyboard: Enter/Space to open file dialog
- [ ] 5.5.6 Add RTL + dark mode
- [ ] 5.5.7 Write unit tests
- [ ] 5.5.8 Export from public API

### 5.6 Date Picker Component
- [ ] 5.6.1 Create `dga-datepicker` component with ControlValueAccessor
- [ ] 5.6.2 Implement Gregorian calendar view (month grid, year/month navigation)
- [ ] 5.6.3 Implement features: min/max dates, disabled dates, range selection
- [ ] 5.6.4 Add ARIA: `role="dialog"` for popup, grid navigation, `aria-selected`
- [ ] 5.6.5 Add keyboard: Arrow keys for day navigation, Page Up/Down for months
- [ ] 5.6.6 Add RTL + dark mode
- [ ] 5.6.7 Write unit tests
- [ ] 5.6.8 Export from public API
- [ ] 5.6.9 (Stretch) Hijri calendar support

### 5.7 Navigation Header Component
- [ ] 5.7.1 Create `dga-header` component
- [ ] 5.7.2 Implement features: logo, nav links, search, language switcher, mobile hamburger
- [ ] 5.7.3 Implement responsive: full nav (desktop), hamburger menu (mobile)
- [ ] 5.7.4 Add skip-to-content link
- [ ] 5.7.5 Add ARIA: `<nav>`, `aria-expanded` for mobile menu
- [ ] 5.7.6 Add RTL + dark mode
- [ ] 5.7.7 Write unit tests
- [ ] 5.7.8 Export from public API

### 5.8 Footer Component
- [ ] 5.8.1 Create `dga-footer` component
- [ ] 5.8.2 Implement features: multi-column links, social icons, copyright
- [ ] 5.8.3 Implement responsive: columns (desktop), accordion (mobile)
- [ ] 5.8.4 Add ARIA: `<footer role="contentinfo">`, nav sections
- [ ] 5.8.5 Add RTL + dark mode
- [ ] 5.8.6 Write unit tests
- [ ] 5.8.7 Export from public API

### 5.9 Sidebar Navigation Component
- [ ] 5.9.1 Create `dga-sidebar` component
- [ ] 5.9.2 Implement features: collapsible, nested items, active state, icons
- [ ] 5.9.3 Add ARIA: `<nav>`, `aria-expanded` for sub-menus
- [ ] 5.9.4 Add RTL + dark mode
- [ ] 5.9.5 Write unit tests
- [ ] 5.9.6 Export from public API

### 5.10 Validation
- [ ] 5.10.1 All unit tests pass
- [ ] 5.10.2 Library builds without errors
- [ ] 5.10.3 Commit and tag: `phase-5-complete`

---

## Phase 6: Storybook
**Goal**: Storybook 8 with stories for every component, interactive controls, accessibility addon.
**Branch**: `feature/phase-6-storybook`
**Depends on**: Phase 2-5 (can start after Phase 2)

### 6.1 Storybook Setup
- [ ] 6.1.1 Install Storybook 8 for Angular
- [ ] 6.1.2 Configure `.storybook/main.ts` — SCSS support, DGA token imports
- [ ] 6.1.3 Configure `.storybook/preview.ts` — RTL, dark mode decorators, IBM Plex Sans Arabic
- [ ] 6.1.4 Add `@storybook/addon-a11y` for accessibility audits
- [ ] 6.1.5 Add `@storybook/addon-controls` for interactive prop editing

### 6.2 Component Stories (1 per component)
- [ ] 6.2.1 Button stories (all variants, sizes, states, icon-only)
- [ ] 6.2.2 Input stories (types, states, with prefix/suffix)
- [ ] 6.2.3 Textarea stories
- [ ] 6.2.4 Select stories (single, searchable, grouped)
- [ ] 6.2.5 Checkbox stories (states, indeterminate)
- [ ] 6.2.6 Radio stories (group behavior)
- [ ] 6.2.7 Switch stories
- [ ] 6.2.8 Card stories (variants, interactive, media)
- [ ] 6.2.9 Tag stories (colors, styles, removable)
- [ ] 6.2.10 Alert stories (types, severities, toast)
- [ ] 6.2.11 Accordion stories
- [ ] 6.2.12 Tabs stories (horizontal, vertical)
- [ ] 6.2.13 Table stories (sortable, selectable, paginated)
- [ ] 6.2.14 Modal stories (confirmation, form)
- [ ] 6.2.15 Breadcrumb stories
- [ ] 6.2.16 Pagination stories
- [ ] 6.2.17 Stepper stories
- [ ] 6.2.18 Tooltip stories (positions)
- [ ] 6.2.19 Popover stories
- [ ] 6.2.20 Avatar stories (image, initials, group)
- [ ] 6.2.21 Spinner stories
- [ ] 6.2.22 Progress Bar stories
- [ ] 6.2.23 Skeleton stories
- [ ] 6.2.24 File Upload stories
- [ ] 6.2.25 Date Picker stories
- [ ] 6.2.26 Header stories
- [ ] 6.2.27 Footer stories
- [ ] 6.2.28 Sidebar stories

### 6.3 Documentation Pages
- [ ] 6.3.1 "Getting Started" docs page
- [ ] 6.3.2 "Design Tokens" docs page (color swatches, spacing scale, typography)
- [ ] 6.3.3 "Accessibility" docs page
- [ ] 6.3.4 "RTL Support" docs page
- [ ] 6.3.5 "Dark Mode" docs page

### 6.4 Validation
- [ ] 6.4.1 `npm run storybook` runs without errors
- [ ] 6.4.2 All stories render correctly
- [ ] 6.4.3 Accessibility addon shows no violations
- [ ] 6.4.4 Commit and tag: `phase-6-complete`

---

## Phase 7: Demo Application
**Goal**: Showcase app with all components, theme switcher, language switcher.
**Branch**: `feature/phase-7-demo-app`
**Depends on**: Phase 2-5

### 7.1 App Shell
- [ ] 7.1.1 Configure demo app routing (lazy-loaded pages)
- [ ] 7.1.2 Create app layout with DGA header + footer
- [ ] 7.1.3 Create theme switcher service (light/dark, persists to localStorage)
- [ ] 7.1.4 Create language switcher service (ar/en, persists to localStorage)
- [ ] 7.1.5 Create i18n JSON files (ar.json, en.json)
- [ ] 7.1.6 Set `dir="rtl"` / `dir="ltr"` based on language

### 7.2 Showcase Pages
- [ ] 7.2.1 Home page — overview, quick links to component pages
- [ ] 7.2.2 Buttons showcase page
- [ ] 7.2.3 Form inputs showcase page (input, textarea, select, checkbox, radio, switch)
- [ ] 7.2.4 Cards showcase page
- [ ] 7.2.5 Alerts & notifications showcase page
- [ ] 7.2.6 Tables showcase page
- [ ] 7.2.7 Navigation showcase page (breadcrumb, tabs, pagination, stepper)
- [ ] 7.2.8 Feedback showcase page (modal, tooltip, popover)
- [ ] 7.2.9 Loading states showcase page (spinner, progress, skeleton)
- [ ] 7.2.10 File upload & date picker showcase page

### 7.3 Component Playground
- [ ] 7.3.1 Interactive props editor panel
- [ ] 7.3.2 Live preview rendering
- [ ] 7.3.3 Code snippet display (copy to clipboard)

### 7.4 Validation
- [ ] 7.4.1 Demo app builds for production
- [ ] 7.4.2 All pages render correctly in Chrome, Firefox, Safari, Edge
- [ ] 7.4.3 RTL/LTR switching works
- [ ] 7.4.4 Dark/light switching works
- [ ] 7.4.5 Commit and tag: `phase-7-complete`

---

## Phase 8: Page Templates
**Goal**: Ready-to-use page templates for common government app pages.
**Branch**: `feature/phase-8-templates`
**Depends on**: Phase 2-5

### 8.1 Authentication Templates
- [ ] 8.1.1 Login page template (email/password, social login buttons, forgot password link)
- [ ] 8.1.2 Registration page template (multi-field form, terms checkbox)

### 8.2 Dashboard Template
- [ ] 8.2.1 Dashboard layout (sidebar + content area)
- [ ] 8.2.2 KPI metric cards row
- [ ] 8.2.3 Chart placeholders (line, bar, pie)
- [ ] 8.2.4 Recent activity table
- [ ] 8.2.5 Quick actions section

### 8.3 Data Management Templates
- [ ] 8.3.1 Data list page (search bar, filters, table with pagination, bulk actions)
- [ ] 8.3.2 Detail/view page (header with actions, info sections, related data)
- [ ] 8.3.3 Form page — single step (create/edit entity)
- [ ] 8.3.4 Form page — multi-step wizard (stepper + form sections)

### 8.4 Utility Templates
- [ ] 8.4.1 Settings page (sections with toggles, inputs, save button)
- [ ] 8.4.2 Error 404 page
- [ ] 8.4.3 Error 500 page
- [ ] 8.4.4 Error 403 page
- [ ] 8.4.5 Empty state page (illustration placeholder, message, action button)

### 8.5 Validation
- [ ] 8.5.1 All templates render correctly
- [ ] 8.5.2 All templates are responsive (mobile, tablet, desktop)
- [ ] 8.5.3 All templates support RTL + dark mode
- [ ] 8.5.4 Commit and tag: `phase-8-complete`

---

## Phase 9: CI/CD, Documentation & Publishing
**Goal**: GitHub Actions, npm publishing config, comprehensive README.
**Branch**: `feature/phase-9-cicd-docs`
**Depends on**: All previous phases

### 9.1 GitHub Actions
- [ ] 9.1.1 Create CI workflow (`ci.yml`): lint, test, build on every PR
- [ ] 9.1.2 Create publish workflow (`publish.yml`): build library + publish to npm on release tag
- [ ] 9.1.3 Create Storybook deploy workflow (to GitHub Pages)

### 9.2 npm Publishing
- [ ] 9.2.1 Configure `projects/dga-components/package.json` for npm (`@dga/angular-template`)
- [ ] 9.2.2 Add `peerDependencies` (Angular 20+)
- [ ] 9.2.3 Add `keywords`, `repository`, `homepage`, `bugs` fields
- [ ] 9.2.4 Create `.npmignore`

### 9.3 Documentation
- [ ] 9.3.1 Write `README.md` — Arabic section + English section
  - Installation, usage, component list, theming, RTL, dark mode, contributing
- [ ] 9.3.2 Write `CONTRIBUTING.md` — how to add components, code standards, PR process
- [ ] 9.3.3 Write `CHANGELOG.md` — initial release notes

### 9.4 Final Validation
- [ ] 9.4.1 Full `ng build dga-components` succeeds
- [ ] 9.4.2 Full `ng test` — all tests pass
- [ ] 9.4.3 Storybook builds for production
- [ ] 9.4.4 Demo app builds for production
- [ ] 9.4.5 ESLint passes with no errors
- [ ] 9.4.6 npm pack produces valid package
- [ ] 9.4.7 Tag: `v1.0.0`

---

## Summary

| Phase | Steps | Status | Tag |
|-------|-------|--------|-----|
| 1. Scaffold & Tokens | 1.1-1.4 (28 steps) | [ ] Not started | `phase-1-complete` |
| 2. Core Form Components | 2.1-2.8 (47 steps) | [ ] Not started | `phase-2-complete` |
| 3. Content & Data | 3.1-3.7 (42 steps) | [ ] Not started | `phase-3-complete` |
| 4. Navigation & Feedback | 4.1-4.7 (42 steps) | [ ] Not started | `phase-4-complete` |
| 5. Advanced Components | 5.1-5.10 (52 steps) | [ ] Not started | `phase-5-complete` |
| 6. Storybook | 6.1-6.4 (38 steps) | [ ] Not started | `phase-6-complete` |
| 7. Demo Application | 7.1-7.4 (19 steps) | [ ] Not started | `phase-7-complete` |
| 8. Page Templates | 8.1-8.5 (17 steps) | [ ] Not started | `phase-8-complete` |
| 9. CI/CD & Docs | 9.1-9.4 (16 steps) | [ ] Not started | `v1.0.0` |
| **Total** | **301 steps** | | |

## Session Resume Instructions

To resume in a new session, tell Claude:
> "Resume work on dga-angular-template. Read PLAN.md at `C:\Users\GACA-IT\Desktop\GACA Projects\repos\dga-angular-template\PLAN.md` for current progress. Continue from the first unchecked step."
