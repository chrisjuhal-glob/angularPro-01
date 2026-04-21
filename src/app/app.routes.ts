import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'Calculator',
        loadComponent: () => import('@/calculator/pages/calculator-view/calculator-view')
    },
    {
        path: '**',
        redirectTo: 'Calculator',
    }  
];
