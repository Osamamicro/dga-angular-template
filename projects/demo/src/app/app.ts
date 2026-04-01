import { Component, signal, effect, inject, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DgaHeaderComponent, DgaFooterComponent } from 'dga-components';
import { DOCUMENT } from '@angular/common';
import { TranslationService } from './i18n/translation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DgaHeaderComponent, DgaFooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private document = inject(DOCUMENT);
  readonly i18n = inject(TranslationService);

  /** Base href from <base> tag — works for both local dev and GitHub Pages */
  private base = this.document.querySelector('base')?.getAttribute('href') ?? '/';
  private href = (path: string) => `${this.base}${path}`.replace('//', '/');

  navItems = computed(() => [
    { label: this.i18n.t('app.nav.home'), href: this.href(''), active: true },
    { label: this.i18n.t('app.nav.buttons'), href: this.href('buttons') },
    { label: this.i18n.t('app.nav.forms'), href: this.href('forms') },
    { label: this.i18n.t('app.nav.cards'), href: this.href('cards') },
    { label: this.i18n.t('app.nav.tables'), href: this.href('tables') },
    { label: this.i18n.t('app.nav.navigation'), href: this.href('navigation') },
    { label: this.i18n.t('app.nav.feedback'), href: this.href('feedback') },
    { label: this.i18n.t('app.nav.loading'), href: this.href('loading') },
  ]);

  footerColumns = computed(() => [
    {
      title: this.i18n.t('app.footer.components'),
      links: [
        { label: this.i18n.t('app.nav.buttons'), href: this.href('buttons') },
        { label: this.i18n.t('app.nav.forms'), href: this.href('forms') },
        { label: this.i18n.t('app.nav.cards'), href: this.href('cards') },
        { label: this.i18n.t('app.nav.tables'), href: this.href('tables') },
      ],
    },
    {
      title: this.i18n.t('app.footer.resources'),
      links: [
        { label: this.i18n.t('app.footer.getStarted'), href: this.href('') },
        { label: this.i18n.t('app.footer.designTokens'), href: this.href('') },
        { label: this.i18n.t('app.footer.accessibility'), href: this.href('') },
      ],
    },
  ]);

  currentLang = signal<string>('ar');
  currentTheme = signal<string>('light');

  constructor() {
    effect(() => {
      const lang = this.currentLang();
      this.document.documentElement.lang = lang;
      this.document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    });

    effect(() => {
      const theme = this.currentTheme();
      this.document.documentElement.setAttribute('data-theme', theme);
    });
  }

  onLanguageChange(lang: string) {
    this.currentLang.set(lang);
    this.i18n.setLang(lang);
  }
}
