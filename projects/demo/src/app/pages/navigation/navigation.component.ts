import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  DgaBreadcrumbComponent,
  DgaBreadcrumbItemComponent,
  DgaTabsComponent,
  DgaTabComponent,
  DgaStepperComponent,
  DgaStepComponent,
  DgaSidebarComponent,
} from 'dga-components';
import type { DgaSidebarItem } from 'dga-components';
import { CodePreviewComponent } from '../../shared/code-preview.component';
import { SectionHeaderComponent } from '../../shared/section-header.component';
import { DocsTocComponent, TocItem } from '../../layout/docs-toc.component';
import { TranslationService } from '../../i18n/translation.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    DgaBreadcrumbComponent,
    DgaBreadcrumbItemComponent,
    DgaTabsComponent,
    DgaTabComponent,
    DgaStepperComponent,
    DgaStepComponent,
    DgaSidebarComponent,
    CodePreviewComponent,
    SectionHeaderComponent,
    DocsTocComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="docs-page">
      <div class="docs-page__content">
        <h1 class="docs-page__title">{{ i18n.t('navigation.pageTitle') }}</h1>
        <p class="docs-page__description">{{ i18n.t('navigation.description') }}</p>

        <!-- Live Demo -->
        <app-section-header [title]="i18n.t('docs.liveDemo')" anchorId="live-demo" />
        <app-code-preview
          [visualLabel]="i18n.t('docs.visual')"
          [codeLabel]="i18n.t('docs.code')"
          [code]="basicCode"
        >
          <div visual>
            <dga-breadcrumb>
              <dga-breadcrumb-item href="/">Home</dga-breadcrumb-item>
              <dga-breadcrumb-item href="/navigation">Components</dga-breadcrumb-item>
              <dga-breadcrumb-item [active]="true">Navigation</dga-breadcrumb-item>
            </dga-breadcrumb>
          </div>
        </app-code-preview>

        <!-- Breadcrumb -->
        <app-section-header
          [title]="i18n.t('navigation.breadcrumb.title')"
          [description]="i18n.t('navigation.breadcrumb.desc')"
          anchorId="breadcrumb"
        />
        <div class="demo-preview">
          <dga-breadcrumb>
            <dga-breadcrumb-item href="/">Home</dga-breadcrumb-item>
            <dga-breadcrumb-item href="/navigation">Components</dga-breadcrumb-item>
            <dga-breadcrumb-item [active]="true">Navigation</dga-breadcrumb-item>
          </dga-breadcrumb>
        </div>

        <!-- Tabs Horizontal -->
        <app-section-header
          [title]="i18n.t('navigation.tabsH.title')"
          [description]="i18n.t('navigation.tabsH.desc')"
          anchorId="tabs-horizontal"
        />
        <div class="demo-preview">
          <dga-tabs orientation="horizontal">
            <dga-tab label="Overview">
              <p>This is the overview tab content.</p>
            </dga-tab>
            <dga-tab label="Details">
              <p>This is the details tab content.</p>
            </dga-tab>
            <dga-tab label="Settings">
              <p>This is the settings tab content.</p>
            </dga-tab>
          </dga-tabs>
        </div>

        <!-- Tabs Vertical -->
        <app-section-header
          [title]="i18n.t('navigation.tabsV.title')"
          [description]="i18n.t('navigation.tabsV.desc')"
          anchorId="tabs-vertical"
        />
        <div class="demo-preview">
          <dga-tabs orientation="vertical">
            <dga-tab label="Profile">
              <p>Profile settings and information.</p>
            </dga-tab>
            <dga-tab label="Security">
              <p>Security and password settings.</p>
            </dga-tab>
            <dga-tab label="Notifications">
              <p>Notification preferences.</p>
            </dga-tab>
          </dga-tabs>
        </div>

        <!-- Stepper -->
        <app-section-header
          [title]="i18n.t('navigation.stepper.title')"
          [description]="i18n.t('navigation.stepper.desc')"
          anchorId="stepper"
        />
        <div class="demo-preview">
          <dga-stepper [activeStep]="1" [clickable]="true">
            <dga-step label="Personal Info" description="Name and contact details" />
            <dga-step label="Verification" description="Identity verification" />
            <dga-step label="Review" description="Review and submit" />
            <dga-step label="Complete" description="Application submitted" />
          </dga-stepper>
        </div>

        <!-- Sidebar -->
        <app-section-header
          [title]="i18n.t('navigation.sidebar.title')"
          [description]="i18n.t('navigation.sidebar.desc')"
          anchorId="sidebar"
        />
        <div class="demo-preview">
          <div class="demo-sidebar-container">
            <dga-sidebar [items]="sidebarItems" />
          </div>
        </div>

        <!-- Accessibility -->
        <app-section-header [title]="i18n.t('docs.accessibility')" anchorId="accessibility" />
        <div class="docs-accessibility">
          <ul>
            <li>Breadcrumb uses nav with aria-label</li>
            <li>Tabs support arrow key navigation</li>
            <li>Stepper announces current step via aria-current</li>
            <li>Active sidebar item indicated via aria-current</li>
          </ul>
        </div>
      </div>

      <app-docs-toc [heading]="i18n.t('docs.onThisPage')" [items]="tocItems" />
    </div>
  `,
  styles: `
    .docs-page { display: flex; gap: var(--dga-spacing-3xl, 64px); }
    .docs-page__content { flex: 1; min-width: 0; }
    .docs-page__title { font-size: 2rem; font-weight: 700; color: var(--dga-neutral-color-900, #111827); margin: 0 0 var(--dga-spacing-sm, 8px); }
    .docs-page__description { font-size: 1rem; color: var(--dga-neutral-color-500, #6b7280); margin: 0 0 var(--dga-spacing-2xl, 40px); line-height: 1.7; max-width: 680px; }
    .docs-page__subtitle { font-size: 0.9rem; color: var(--dga-neutral-color-500, #6b7280); margin: 0 0 var(--dga-spacing-md, 16px); }
    .docs-accessibility ul { padding-inline-start: var(--dga-spacing-lg, 24px); color: var(--dga-neutral-color-600, #4b5563); line-height: 2; }
    h3 { font-size: 1.1rem; font-weight: 600; color: var(--dga-neutral-color-800, #1f2937); margin: var(--dga-spacing-xl, 32px) 0 var(--dga-spacing-xs, 8px); }
    .demo-sidebar-container {
      max-width: 280px;
      border: 1px solid var(--dga-neutral-color-200);
      border-radius: var(--dga-radius-md);
      overflow: hidden;
    }
  `,
})
export class NavigationComponent {
  readonly i18n = inject(TranslationService);

  readonly tocItems: TocItem[] = [
    { label: 'Live Demo', anchorId: 'live-demo' },
    { label: 'Breadcrumb', anchorId: 'breadcrumb' },
    { label: 'Tabs Horizontal', anchorId: 'tabs-horizontal' },
    { label: 'Tabs Vertical', anchorId: 'tabs-vertical' },
    { label: 'Stepper', anchorId: 'stepper' },
    { label: 'Sidebar', anchorId: 'sidebar' },
    { label: 'Accessibility', anchorId: 'accessibility' },
  ];

  readonly basicCode = `import { DgaBreadcrumbComponent, DgaBreadcrumbItemComponent } from 'dga-components';

@Component({
  imports: [DgaBreadcrumbComponent, DgaBreadcrumbItemComponent],
  template: \`
    <dga-breadcrumb>
      <dga-breadcrumb-item href="/">Home</dga-breadcrumb-item>
      <dga-breadcrumb-item href="/components">Components</dga-breadcrumb-item>
      <dga-breadcrumb-item [active]="true">Current</dga-breadcrumb-item>
    </dga-breadcrumb>
  \`
})`;

  readonly sidebarItems: DgaSidebarItem[] = [
    { label: 'Dashboard', icon: 'home', href: '/' },
    { label: 'Users', icon: 'people', href: '/users' },
    { label: 'Reports', icon: 'bar_chart', href: '/reports' },
    { label: 'Settings', icon: 'settings', href: '/settings' },
  ];
}
