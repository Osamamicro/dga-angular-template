# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2026-04-02

### Added

#### Components (28)
- **Form**: Button, Input, Textarea, Select, Checkbox, Radio Group, Switch
- **Content & Data**: Card, Tag, Alert, Accordion, Tabs, Table
- **Navigation & Feedback**: Modal, Breadcrumb, Pagination, Stepper, Tooltip (directive), Popover
- **Advanced**: Avatar, Spinner, Progress Bar, Skeleton, File Upload, Date Picker, Header, Footer, Sidebar

#### Design Tokens
- Color palettes: Primary (Saudi Green), Secondary (Gold), Tertiary (Lavender), Neutral, Error, Warning, Success, Info
- Typography: IBM Plex Sans Arabic with 12 size/weight/line-height combinations
- Spacing scale: 0 through 11xl (4px base)
- Shadows: xs through 3xl + backdrop blur
- Border radii: none through full
- Breakpoints: phone, tablet, desktop, wide

#### Features
- Full RTL/LTR support for all components
- Dark mode via `[data-theme="dark"]`
- WCAG 2.1 AA accessibility (ARIA, keyboard navigation, focus management)
- Angular reactive forms integration (ControlValueAccessor) for all form components
- 12 page templates (login, registration, dashboard, data list, detail, forms, settings, error pages, empty state)
- Storybook 10 with 28 interactive stories and accessibility addon
- Demo application with 8 showcase pages

#### CI/CD
- GitHub Actions CI workflow (lint, test, build on PR)
- npm publish workflow (on release tag)
- Storybook deploy to GitHub Pages
