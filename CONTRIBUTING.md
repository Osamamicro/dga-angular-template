# Contributing to @dga/angular-template

Thank you for your interest in contributing! This guide covers how to add components, code standards, and the PR process.

## Getting Started

```bash
git clone https://github.com/user/dga-angular-template.git
cd dga-angular-template
npm install
```

## Project Structure

```
projects/dga-components/
  src/
    lib/           # Component source files
      button/      # Each component has its own directory
        button.component.ts
        button.component.scss
        button.component.spec.ts
    styles/        # Design tokens and shared SCSS
    public-api.ts  # Public API barrel export
```

## Adding a New Component

1. **Create the component directory** under `projects/dga-components/src/lib/`
2. **Component requirements**:
   - Standalone component (`standalone: true`)
   - OnPush change detection
   - `ViewEncapsulation.None` (uses DGA token CSS classes)
   - Signal-based inputs (`input()`, `input.required()`)
   - Signal-based outputs (`output()`)
3. **Implement these features**:
   - RTL support (test with `dir="rtl"`)
   - Dark mode (respond to `[data-theme="dark"]`)
   - ARIA attributes for accessibility
   - Keyboard navigation where applicable
4. **Write tests** using Vitest (not Jasmine/Karma):
   - Use `vi.fn()` for mocks
   - Use `fixture.componentRef.setInput()` for signal inputs
   - Test all variants, states, accessibility, RTL
5. **Export from public API** in `public-api.ts`
6. **Create a Storybook story** with autodocs tag

## Code Standards

- **TypeScript**: Strict mode, no `any` types
- **SCSS**: Use DGA design tokens (`var(--dga-*)`) — never hardcode colors/spacing
- **Naming**: `dga-` prefix for selectors, `Dga` prefix for class names
- **Exports**: Use `export type` for re-exporting types (isolatedModules)
- **Testing**: Vitest with `vi.*` utilities — not Jasmine/Karma helpers

## Commit Messages

Use conventional commit format:

```
Phase N: Component name — brief description

Detailed explanation if needed.
```

## Pull Request Process

1. Create a feature branch from `main`
2. Implement the component following the standards above
3. Ensure all tests pass: `ng test dga-components --watch=false`
4. Ensure the library builds: `ng build dga-components`
5. Ensure Storybook builds: `npm run build-storybook`
6. Open a PR against `main` with a description of changes

## Testing

```bash
# Run all library tests
ng test dga-components

# Run tests in watch mode
ng test dga-components --watch

# Build library
ng build dga-components --configuration production
```

## Important Notes

- Angular **21** with Vitest (not Karma/Jasmine)
- Signal inputs require `fixture.componentRef.setInput()` in tests
- `@use` must come before all other rules in SCSS files
- Google Font (IBM Plex Sans Arabic) loaded via `<link>` in HTML, not `@import` in SCSS
