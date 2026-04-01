import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="demo-page">
      <h1 class="demo-page__title">Navigation</h1>

      <section class="demo-section">
        <h2 class="demo-section__title">Breadcrumb</h2>
        <div class="demo-section__content">
          <dga-breadcrumb>
            <dga-breadcrumb-item href="/">Home</dga-breadcrumb-item>
            <dga-breadcrumb-item href="/navigation">Components</dga-breadcrumb-item>
            <dga-breadcrumb-item [active]="true">Navigation</dga-breadcrumb-item>
          </dga-breadcrumb>
        </div>
      </section>

      <section class="demo-section">
        <h2 class="demo-section__title">Tabs — Horizontal</h2>
        <div class="demo-section__content">
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
      </section>

      <section class="demo-section">
        <h2 class="demo-section__title">Tabs — Vertical</h2>
        <div class="demo-section__content">
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
      </section>

      <section class="demo-section">
        <h2 class="demo-section__title">Stepper</h2>
        <div class="demo-section__content">
          <dga-stepper [activeStep]="1" [clickable]="true">
            <dga-step label="Personal Info" description="Name and contact details" />
            <dga-step label="Verification" description="Identity verification" />
            <dga-step label="Review" description="Review and submit" />
            <dga-step label="Complete" description="Application submitted" />
          </dga-stepper>
        </div>
      </section>

      <section class="demo-section">
        <h2 class="demo-section__title">Sidebar</h2>
        <div class="demo-section__content demo-sidebar-container">
          <dga-sidebar [items]="sidebarItems" />
        </div>
      </section>
    </div>
  `,
  styles: `
    .demo-sidebar-container {
      max-width: 280px;
      border: 1px solid var(--dga-neutral-color-200);
      border-radius: var(--dga-radius-md);
      overflow: hidden;
    }
  `,
})
export class NavigationComponent {
  readonly sidebarItems: DgaSidebarItem[] = [
    { label: 'Dashboard', icon: 'home', href: '/' },
    { label: 'Users', icon: 'people', href: '/users' },
    { label: 'Reports', icon: 'bar_chart', href: '/reports' },
    { label: 'Settings', icon: 'settings', href: '/settings' },
  ];
}
