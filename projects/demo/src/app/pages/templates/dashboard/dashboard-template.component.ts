import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  DgaSidebarComponent,
  DgaCardComponent,
  DgaTagComponent,
  DgaTableComponent,
  DgaButtonComponent,
} from 'dga-components';
import type { DgaSidebarItem, DgaTableColumn } from 'dga-components';

@Component({
  selector: 'app-dashboard-template',
  standalone: true,
  imports: [
    DgaSidebarComponent,
    DgaCardComponent,
    DgaTagComponent,
    DgaTableComponent,
    DgaButtonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dashboard-layout">
      <aside class="dashboard-layout__sidebar">
        <dga-sidebar [items]="sidebarItems" />
      </aside>

      <main class="dashboard-layout__main">
        <h1 class="dashboard-layout__title">&#1604;&#1608;&#1581;&#1577; &#1575;&#1604;&#1578;&#1581;&#1603;&#1605;</h1>

        <!-- Metric Cards -->
        <div class="dashboard-metrics">
          @for (metric of metrics; track metric.label) {
            <dga-card variant="shadow">
              <div class="metric-card">
                <span class="metric-card__value">{{ metric.value }}</span>
                <span class="metric-card__label">{{ metric.label }}</span>
                <dga-tag [color]="metric.trendColor">{{ metric.trend }}</dga-tag>
              </div>
            </dga-card>
          }
        </div>

        <!-- Chart Placeholders -->
        <div class="dashboard-charts">
          <dga-card variant="outlined">
            <div class="chart-placeholder">
              <h3 class="chart-placeholder__title">&#1573;&#1581;&#1589;&#1575;&#1574;&#1610;&#1575;&#1578; &#1588;&#1607;&#1585;&#1610;&#1577;</h3>
              <div class="chart-placeholder__area">Chart placeholder</div>
            </div>
          </dga-card>
          <dga-card variant="outlined">
            <div class="chart-placeholder">
              <h3 class="chart-placeholder__title">&#1575;&#1604;&#1578;&#1608;&#1586;&#1610;&#1593;</h3>
              <div class="chart-placeholder__area">Chart placeholder</div>
            </div>
          </dga-card>
        </div>

        <!-- Activity Table -->
        <section class="dashboard-activity">
          <h2 class="dashboard-activity__title">&#1570;&#1582;&#1585; &#1575;&#1604;&#1571;&#1606;&#1588;&#1591;&#1577;</h2>
          <dga-table [columns]="activityColumns" [data]="activityData" />
        </section>

        <!-- Quick Actions -->
        <section class="dashboard-actions">
          <h2 class="dashboard-actions__title">&#1573;&#1580;&#1585;&#1575;&#1569;&#1575;&#1578; &#1587;&#1585;&#1610;&#1593;&#1577;</h2>
          <div class="dashboard-actions__buttons">
            <dga-button variant="primary">&#1573;&#1606;&#1588;&#1575;&#1569; &#1578;&#1602;&#1585;&#1610;&#1585;</dga-button>
            <dga-button variant="secondary">&#1573;&#1590;&#1575;&#1601;&#1577; &#1605;&#1587;&#1578;&#1582;&#1583;&#1605;</dga-button>
            <dga-button variant="outline">&#1578;&#1589;&#1583;&#1610;&#1585; &#1575;&#1604;&#1576;&#1610;&#1575;&#1606;&#1575;&#1578;</dga-button>
          </div>
        </section>
      </main>
    </div>
  `,
  styles: `
    .dashboard-layout {
      display: grid;
      grid-template-columns: 260px 1fr;
      min-height: 100vh;
    }

    .dashboard-layout__sidebar {
      border-inline-end: 1px solid var(--dga-neutral-color-200);
      background-color: #fff;
    }

    .dashboard-layout__main {
      padding: var(--dga-spacing-xl);
      background-color: var(--dga-neutral-color-50);
    }

    .dashboard-layout__title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--dga-neutral-color-900);
      margin: 0 0 var(--dga-spacing-xl);
    }

    .dashboard-metrics {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--dga-spacing-md);
      margin-bottom: var(--dga-spacing-xl);
    }

    .metric-card {
      display: flex;
      flex-direction: column;
      gap: var(--dga-spacing-xs);
      padding: var(--dga-spacing-sm) 0;
    }

    .metric-card__value {
      font-size: 2rem;
      font-weight: 700;
      color: var(--dga-neutral-color-900);
      line-height: 1;
    }

    .metric-card__label {
      font-size: 0.875rem;
      color: var(--dga-neutral-color-500);
    }

    .dashboard-charts {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--dga-spacing-md);
      margin-bottom: var(--dga-spacing-xl);
    }

    .chart-placeholder {
      display: flex;
      flex-direction: column;
      gap: var(--dga-spacing-md);
    }

    .chart-placeholder__title {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
      color: var(--dga-neutral-color-700);
    }

    .chart-placeholder__area {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 200px;
      background-color: var(--dga-neutral-color-100);
      border-radius: var(--dga-radius-md);
      color: var(--dga-neutral-color-400);
      font-size: 0.875rem;
    }

    .dashboard-activity {
      margin-bottom: var(--dga-spacing-xl);
    }

    .dashboard-activity__title,
    .dashboard-actions__title {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--dga-neutral-color-800);
      margin: 0 0 var(--dga-spacing-md);
    }

    .dashboard-actions__buttons {
      display: flex;
      gap: var(--dga-spacing-md);
    }
  `,
})
export class DashboardTemplateComponent {
  readonly sidebarItems: DgaSidebarItem[] = [
    { label: '\u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645', icon: 'dashboard', href: '#' },
    { label: '\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u0648\u0646', icon: 'people', href: '#' },
    { label: '\u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631', icon: 'bar_chart', href: '#' },
    { label: '\u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A', icon: 'settings', href: '#' },
  ];

  readonly metrics = [
    { value: '1,245', label: '\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646', trend: '+12%', trendColor: 'success' as const },
    { value: '342', label: '\u0637\u0644\u0628\u0627\u062A \u062C\u062F\u064A\u062F\u0629', trend: '+5%', trendColor: 'success' as const },
    { value: '89', label: '\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629', trend: '-3%', trendColor: 'warning' as const },
    { value: '15', label: '\u0645\u062A\u0623\u062E\u0631\u0629', trend: '+2', trendColor: 'danger' as const },
  ];

  readonly activityColumns: DgaTableColumn[] = [
    { key: 'date', label: '\u0627\u0644\u062A\u0627\u0631\u064A\u062E', sortable: true },
    { key: 'action', label: '\u0627\u0644\u0625\u062C\u0631\u0627\u0621', sortable: false },
    { key: 'user', label: '\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645', sortable: true },
    { key: 'status', label: '\u0627\u0644\u062D\u0627\u0644\u0629', sortable: true },
  ];

  readonly activityData: Record<string, unknown>[] = [
    { date: '2026-04-01', action: '\u062A\u0633\u062C\u064A\u0644 \u062F\u062E\u0648\u0644', user: '\u0623\u062D\u0645\u062F \u0639\u0644\u064A', status: '\u0645\u0643\u062A\u0645\u0644' },
    { date: '2026-04-01', action: '\u062A\u062D\u062F\u064A\u062B \u0645\u0644\u0641', user: '\u0633\u0627\u0631\u0629 \u0645\u062D\u0645\u062F', status: '\u0645\u0643\u062A\u0645\u0644' },
    { date: '2026-03-31', action: '\u0625\u0631\u0633\u0627\u0644 \u062A\u0642\u0631\u064A\u0631', user: '\u062E\u0627\u0644\u062F \u0639\u0645\u0631', status: '\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629' },
    { date: '2026-03-31', action: '\u062D\u0630\u0641 \u0633\u062C\u0644', user: '\u0641\u0627\u0637\u0645\u0629 \u062D\u0633\u0646', status: '\u0645\u0643\u062A\u0645\u0644' },
    { date: '2026-03-30', action: '\u0625\u0636\u0627\u0641\u0629 \u0645\u0633\u062A\u062E\u062F\u0645', user: '\u0646\u0648\u0631\u0629 \u0639\u0628\u062F\u0627\u0644\u0644\u0647', status: '\u0645\u0639\u0644\u0642' },
  ];
}
