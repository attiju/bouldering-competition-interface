import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminPageComponent} from "./component/admin-page/admin-page.component";
import {EventListPageComponent} from "./component/event-list-page/event-list-page.component";
import {ClimberPageComponent} from "./component/climber-page/climber-page.component";
import {ClimberListPageComponent} from "./component/admin-page/climber-list-page/climber-list-page.component";
import {SettingsPageComponent} from "./component/admin-page/settings-page/settings-page.component";
import {LeaderboardsPageComponent} from "./component/leaderboards-page/leaderboards-page.component";
import {ClimbersPageComponent} from "./component/climbers-page/climbers-page.component";

const routes: Routes = [
  {
    path: 'events',
    component: EventListPageComponent
  },
  {
    path: 'events/:eventId/admin',
    component: AdminPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'climbers',
        pathMatch: 'full'
      },
      {
        path: 'climbers',
        component: ClimberListPageComponent
      },
      {
        path: 'settings',
        component: SettingsPageComponent
      },
    ]
  },
  {
    path: 'events/:eventId/climbers',
    component: ClimbersPageComponent
  },
  {
    path: 'events/:eventId/leaderboards',
    component: LeaderboardsPageComponent
  },
  {
    path: 'events/:eventId/climbers/:climberId',
    component: ClimberPageComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'events'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
