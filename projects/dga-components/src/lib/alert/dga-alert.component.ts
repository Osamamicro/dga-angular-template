import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  output,
  computed,
  signal,
  OnInit,
  OnDestroy,
} from '@angular/core';

export type DgaAlertSeverity = 'info' | 'success' | 'warning' | 'error' | 'neutral';
export type DgaAlertType = 'inline' | 'toast' | 'banner';

@Component({
  selector: 'dga-alert',
  standalone: true,
  templateUrl: './dga-alert.component.html',
  styleUrls: ['./dga-alert.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgaAlertComponent implements OnInit, OnDestroy {
  /** Severity level of the alert */
  severity = input<DgaAlertSeverity>('info');

  /** Display type of the alert */
  type = input<DgaAlertType>('inline');

  /** Whether the alert can be dismissed */
  dismissible = input<boolean>(false);

  /** Auto-dismiss timeout in milliseconds (minimum 5000ms) */
  autoDismiss = input<number | undefined>(undefined);

  /** Internal visibility state */
  visible = signal(true);

  /** Emitted when the alert is dismissed */
  dismissed = output<void>();

  /** Computed ARIA role based on severity */
  alertRole = computed(() => {
    const sev = this.severity();
    return sev === 'error' || sev === 'warning' ? 'alert' : 'status';
  });

  /** Computed aria-live based on severity */
  alertAriaLive = computed(() => {
    const sev = this.severity();
    return sev === 'error' || sev === 'warning' ? 'assertive' : 'polite';
  });

  /** Computed CSS class string based on severity and type */
  alertClasses = computed(() => {
    const classes = [
      'dga-alert',
      `dga-alert--${this.severity()}`,
      `dga-alert--${this.type()}`,
    ];

    return classes.join(' ');
  });

  private autoDismissTimer: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    const timeout = this.autoDismiss();
    if (timeout !== undefined) {
      const safeTimeout = Math.max(timeout, 5000);
      this.autoDismissTimer = setTimeout(() => {
        this.dismiss();
      }, safeTimeout);
    }
  }

  ngOnDestroy(): void {
    if (this.autoDismissTimer !== null) {
      clearTimeout(this.autoDismissTimer);
    }
  }

  dismiss(): void {
    this.visible.set(false);
    this.dismissed.emit();
  }
}
