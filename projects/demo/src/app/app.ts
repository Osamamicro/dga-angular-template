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

  navItems = computed(() => [
    { label: this.i18n.t('app.nav.home'), href: '/', active: true },
    { label: this.i18n.t('app.nav.buttons'), href: '/buttons' },
    { label: this.i18n.t('app.nav.forms'), href: '/forms' },
    { label: this.i18n.t('app.nav.cards'), href: '/cards' },
    { label: this.i18n.t('app.nav.tables'), href: '/tables' },
    { label: this.i18n.t('app.nav.navigation'), href: '/navigation' },
    { label: this.i18n.t('app.nav.feedback'), href: '/feedback' },
    { label: this.i18n.t('app.nav.loading'), href: '/loading' },
  ]);

  footerColumns = computed(() => [
    {
      title: this.i18n.t('app.footer.components'),
      links: [
        { label: this.i18n.t('app.nav.buttons'), href: '/buttons' },
        { label: this.i18n.t('app.nav.forms'), href: '/forms' },
        { label: this.i18n.t('app.nav.cards'), href: '/cards' },
        { label: this.i18n.t('app.nav.tables'), href: '/tables' },
      ],
    },
    {
      title: this.i18n.t('app.footer.resources'),
      links: [
        { label: this.i18n.t('app.footer.getStarted'), href: '/' },
        { label: this.i18n.t('app.footer.designTokens'), href: '/' },
        { label: this.i18n.t('app.footer.accessibility'), href: '/' },
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
