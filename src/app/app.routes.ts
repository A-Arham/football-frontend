import { Routes } from '@angular/router';
import { TeamsComponent } from './teams/teams';

export const routes: Routes = [
  {
    path: '',            // Default path
    component: TeamsComponent
  },
  // You can add more routes here if needed, for example:
  // { path: 'players', component: PlayersComponent },
];
