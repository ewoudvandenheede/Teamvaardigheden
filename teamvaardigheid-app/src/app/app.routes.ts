import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';
import { PausePage } from './pause-page/pause-page';
import { TaskPage } from './task-page/task-page';

export const routes: Routes = [
    {
        path: '',
        component: HomePage,
        pathMatch: 'full',
    },

    {
        path: 'pauze',
        component: PausePage,
    },

    {
        path: 'takenlijst',
        component: TaskPage,
    }
];
