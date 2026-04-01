import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'buttons',
    loadComponent: () => import('./pages/buttons/buttons.component').then(m => m.ButtonsComponent),
  },
  {
    path: 'forms',
    loadComponent: () => import('./pages/forms/forms.component').then(m => m.FormsComponent),
  },
  {
    path: 'cards',
    loadComponent: () => import('./pages/cards/cards.component').then(m => m.CardsComponent),
  },
  {
    path: 'tables',
    loadComponent: () => import('./pages/tables/tables.component').then(m => m.TablesComponent),
  },
  {
    path: 'navigation',
    loadComponent: () => import('./pages/navigation/navigation.component').then(m => m.NavigationComponent),
  },
  {
    path: 'feedback',
    loadComponent: () => import('./pages/feedback/feedback.component').then(m => m.FeedbackComponent),
  },
  {
    path: 'loading',
    loadComponent: () => import('./pages/loading/loading.component').then(m => m.LoadingComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
