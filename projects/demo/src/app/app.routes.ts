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
  // Page Templates
  {
    path: 'templates/login',
    loadComponent: () => import('./pages/templates/login/login-template.component').then(m => m.LoginTemplateComponent),
  },
  {
    path: 'templates/register',
    loadComponent: () => import('./pages/templates/register/register-template.component').then(m => m.RegisterTemplateComponent),
  },
  {
    path: 'templates/dashboard',
    loadComponent: () => import('./pages/templates/dashboard/dashboard-template.component').then(m => m.DashboardTemplateComponent),
  },
  {
    path: 'templates/data-list',
    loadComponent: () => import('./pages/templates/data-list/data-list-template.component').then(m => m.DataListTemplateComponent),
  },
  {
    path: 'templates/detail-view',
    loadComponent: () => import('./pages/templates/detail-view/detail-view-template.component').then(m => m.DetailViewTemplateComponent),
  },
  {
    path: 'templates/form-single',
    loadComponent: () => import('./pages/templates/form-single/form-single-template.component').then(m => m.FormSingleTemplateComponent),
  },
  {
    path: 'templates/form-wizard',
    loadComponent: () => import('./pages/templates/form-wizard/form-wizard-template.component').then(m => m.FormWizardTemplateComponent),
  },
  {
    path: 'templates/settings',
    loadComponent: () => import('./pages/templates/settings/settings-template.component').then(m => m.SettingsTemplateComponent),
  },
  {
    path: 'templates/empty-state',
    loadComponent: () => import('./pages/templates/empty-state/empty-state-template.component').then(m => m.EmptyStateTemplateComponent),
  },
  {
    path: 'templates/404',
    loadComponent: () => import('./pages/templates/error-404/error-404-template.component').then(m => m.Error404TemplateComponent),
  },
  {
    path: 'templates/500',
    loadComponent: () => import('./pages/templates/error-500/error-500-template.component').then(m => m.Error500TemplateComponent),
  },
  {
    path: 'templates/403',
    loadComponent: () => import('./pages/templates/error-403/error-403-template.component').then(m => m.Error403TemplateComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
