import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
} from '@angular/core';

export interface DgaNavItem {
  label: string;
  href?: string;
  active?: boolean;
  children?: DgaNavItem[];
}

@Component({
  selector: 'dga-header',
  standalone: true,
  templateUrl: './dga-header.component.html',
  styleUrls: ['./dga-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgaHeaderComponent {
  /** Logo URL */
  logoSrc = input<string>('');

  /** Logo alt text */
  logoAlt = input<string>('Logo');

  /** Site title */
  siteTitle = input<string>('');

  /** Navigation items */
  navItems = input<DgaNavItem[]>([]);

  /** Whether to show search */
  showSearch = input<boolean>(false);

  /** Whether to show language switcher */
  showLanguageSwitcher = input<boolean>(false);

  /** Emits when language is toggled */
  languageChange = output<string>();

  /** Emits when search is submitted */
  searchSubmit = output<string>();

  /** Mobile menu state */
  isMobileMenuOpen = signal(false);

  /** Toggle mobile menu */
  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((v) => !v);
  }

  /** Close mobile menu */
  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }
}
