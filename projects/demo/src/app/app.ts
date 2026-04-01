import { Component, signal, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DgaHeaderComponent, DgaFooterComponent } from 'dga-components';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DgaHeaderComponent, DgaFooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private document = inject(DOCUMENT);

  navItems = [
    { label: 'Home', href: '/', active: true },
    { label: 'Buttons', href: '/buttons' },
    { label: 'Forms', href: '/forms' },
    { label: 'Cards', href: '/cards' },
    { label: 'Tables', href: '/tables' },
    { label: 'Navigation', href: '/navigation' },
    { label: 'Feedback', href: '/feedback' },
    { label: 'Loading', href: '/loading' },
  ];

  footerColumns = [
    {
      title: 'Components',
      links: [
        { label: 'Buttons', href: '/buttons' },
        { label: 'Forms', href: '/forms' },
        { label: 'Cards', href: '/cards' },
        { label: 'Tables', href: '/tables' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Getting Started', href: '/' },
        { label: 'Design Tokens', href: '/' },
        { label: 'Accessibility', href: '/' },
      ],
    },
  ];

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
  }
}
