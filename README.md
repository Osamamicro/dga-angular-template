# @dga/angular-template

مكتبة مكونات Angular تطبّق نظام التصميم الوطني السعودي (كود المنصات) الصادر عن هيئة الحكومة الرقمية (DGA).

Angular component library implementing the Saudi DGA National Design System (Platforms Code).

---

## المحتويات / Table of Contents

- [المميزات / Features](#المميزات--features)
- [التثبيت / Installation](#التثبيت--installation)
- [الاستخدام / Usage](#الاستخدام--usage)
- [المكونات / Components](#المكونات--components)
- [التخصيص / Theming](#التخصيص--theming)
- [دعم RTL / RTL Support](#دعم-rtl--rtl-support)
- [الوضع الداكن / Dark Mode](#الوضع-الداكن--dark-mode)
- [المساهمة / Contributing](#المساهمة--contributing)
- [الرخصة / License](#الرخصة--license)

---

## المميزات / Features

- 28 مكون Angular جاهز للاستخدام / 28 production-ready Angular components
- دعم كامل للغة العربية والاتجاه من اليمين لليسار / Full Arabic & RTL support
- الوضع الداكن والفاتح / Light & dark mode
- إمكانية الوصول (WCAG 2.1 AA) / Accessible (WCAG 2.1 AA)
- 12 قالب صفحات جاهز / 12 ready-to-use page templates
- Angular 21+ مع Signals وstandalone components
- Storybook 10 للتوثيق التفاعلي / Interactive docs via Storybook 10
- تصميم رموز DGA (ألوان، خطوط، مسافات) / DGA design tokens (colors, typography, spacing)

---

## التثبيت / Installation

```bash
npm install @dga/angular-template
```

### المتطلبات / Requirements

- Angular 21+
- Node.js 22+

---

## الاستخدام / Usage

Import components directly — all are standalone:

```typescript
import { DgaButtonComponent } from '@dga/angular-template';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [DgaButtonComponent],
  template: `<dga-button variant="primary" size="md">إرسال</dga-button>`,
})
export class ExampleComponent {}
```

### إضافة الأنماط / Add Styles

Add the library styles to your `angular.json`:

```json
{
  "styles": [
    "node_modules/@dga/angular-template/styles/dga-components.scss"
  ]
}
```

Or import in your global SCSS:

```scss
@use '@dga/angular-template/styles/dga-components';
```

### إضافة الخط / Add Font

Add IBM Plex Sans Arabic to your `index.html`:

```html
<link
  href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

---

## المكونات / Components

### نماذج / Form Components
| Component | Selector | Description |
|-----------|----------|-------------|
| Button | `dga-button` | 7 variants, 3 sizes, loading state |
| Input | `dga-input` | Text, email, password, search, number |
| Textarea | `dga-textarea` | Auto-resize, character count |
| Select | `dga-select` | Searchable, option groups |
| Checkbox | `dga-checkbox` | Checked, indeterminate states |
| Radio | `dga-radio-group` / `dga-radio` | Radio group with keyboard nav |
| Switch | `dga-switch` | Toggle on/off |

### محتوى وبيانات / Content & Data
| Component | Selector | Description |
|-----------|----------|-------------|
| Card | `dga-card` | Flat, shadow, outlined, expandable |
| Tag | `dga-tag` | 6 colors, 5 styles, removable |
| Alert | `dga-alert` | Inline, toast, banner |
| Accordion | `dga-accordion` | Single/multi expand |
| Tabs | `dga-tabs` / `dga-tab` | Horizontal, vertical |
| Table | `dga-table` | Sortable, selectable, striped |

### تنقل وملاحظات / Navigation & Feedback
| Component | Selector | Description |
|-----------|----------|-------------|
| Modal | `dga-modal` | Focus trap, Escape to close |
| Breadcrumb | `dga-breadcrumb` | Auto-truncation, responsive |
| Pagination | `dga-pagination` | Page numbers, per-page selector |
| Stepper | `dga-stepper` / `dga-step` | Horizontal/vertical wizard |
| Tooltip | `dgaTooltip` (directive) | 6 positions |
| Popover | `dga-popover` | Click trigger, auto-flip |

### متقدمة / Advanced
| Component | Selector | Description |
|-----------|----------|-------------|
| Avatar | `dga-avatar` | Image, initials, groups |
| Spinner | `dga-spinner` | Loading indicator |
| Progress Bar | `dga-progress-bar` | Determinate/indeterminate |
| Skeleton | `dga-skeleton` | Circle, line, rectangle |
| File Upload | `dga-file-upload` | Drag & drop, validation |
| Date Picker | `dga-datepicker` | Calendar, range, min/max |
| Header | `dga-header` | Navigation, language switcher |
| Footer | `dga-footer` | Multi-column, social links |
| Sidebar | `dga-sidebar` | Collapsible, nested items |

---

## التخصيص / Theming

Override DGA design tokens using CSS custom properties:

```css
:root {
  --dga-color-primary-500: #006d4e;
  --dga-color-secondary-500: #d4a843;
  --dga-font-family: 'IBM Plex Sans Arabic', sans-serif;
  --dga-spacing-4: 1rem;
  --dga-radius-md: 0.5rem;
}
```

---

## دعم RTL / RTL Support

All components support RTL natively. Set the `dir` attribute on your root element:

```html
<html dir="rtl" lang="ar">
```

Components automatically adjust layout, spacing, and icon direction.

---

## الوضع الداكن / Dark Mode

Toggle dark mode by setting `data-theme="dark"` on any ancestor element:

```html
<html data-theme="dark">
```

All components respond to the theme attribute with appropriate color adjustments.

---

## قوالب الصفحات / Page Templates

Ready-to-use page templates for common government applications:

- **Authentication**: Login, Registration
- **Dashboard**: KPI cards, charts, activity table
- **Data Management**: List, Detail, Single-step form, Multi-step wizard
- **Utility**: Settings, 404, 500, 403, Empty state

Import templates from `@dga/angular-template/templates`.

---

## التطوير المحلي / Local Development

```bash
# Install dependencies
npm install

# Build library
ng build dga-components

# Run demo app
ng serve demo

# Run tests
ng test dga-components

# Run Storybook
npm run storybook

# Build Storybook
npm run build-storybook
```

---

## المساهمة / Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on adding components, code standards, and the PR process.

---

## المؤلف / Author

**Osama Ahmed**

---

## الرخصة / License

[MIT](LICENSE)
