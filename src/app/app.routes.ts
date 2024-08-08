import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.page').then( m => m.AdminPage)
  },
  {
    path: 'admin/client-management',
    loadComponent: () => import('./admin/client-management/client-management.page').then( m => m.ClientManagementPage)
  },
  {
    path: 'admin/project-management',
    loadComponent: () => import('./admin/project-management/project-management.page').then( m => m.ProjectManagementPage)
  },
  {
    path: 'admin/content-management',
    loadComponent: () => import('./admin/content-management/content-management.page').then( m => m.ContentManagementPage)
  },
  {
    path: 'admin/analytics-and-reporting',
    loadComponent: () => import('./admin/analytics-and-reporting/analytics-and-reporting.page').then( m => m.AnalyticsAndReportingPage)
  },
  {
    path: 'admin/billing-and-invoicing',
    loadComponent: () => import('./admin/billing-and-invoicing/billing-and-invoicing.page').then( m => m.BillingAndInvoicingPage)
  },
  {
    path: 'admin/user-and-role-management',
    loadComponent: () => import('./admin/user-and-role-management/user-and-role-management.page').then( m => m.UserAndRoleManagementPage)
  },
  {
    path: 'admin/service-catalog-management',
    loadComponent: () => import('./admin/service-catalog-management/service-catalog-management.page').then( m => m.ServiceCatalogManagementPage)
  },
  {
    path: 'admin/marketing-tools',
    loadComponent: () => import('./admin/marketing-tools/marketing-tools.page').then( m => m.MarketingToolsPage)
  },
  {
    path: 'services',
    loadComponent: () => import('./services/services.page').then( m => m.ServicesPage)
  },
  {
    path: 'portfolio',
    loadComponent: () => import('./portfolio/portfolio.page').then( m => m.PortfolioPage)
  },
  {
    path: 'blog',
    loadComponent: () => import('./blog/blog.page').then( m => m.BlogPage)
  },
  {
    path: 'contact',
    loadComponent: () => import('./contact/contact.page').then( m => m.ContactPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.page').then( m => m.DashboardPage)
  },
  {
    path: 'dashboard/project-management',
    loadComponent: () => import('./dashboard/project-management/project-management.page').then( m => m.ProjectManagementPage)
  },
  {
    path: 'dashboard/billing-and-subscription-management',
    loadComponent: () => import('./dashboard/billing-and-subscription-management/billing-and-subscription-management.page').then( m => m.BillingAndSubscriptionManagementPage)
  },
  {
    path: 'dashboard/support',
    loadComponent: () => import('./dashboard/support/support.page').then( m => m.SupportPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage)
  },
];
