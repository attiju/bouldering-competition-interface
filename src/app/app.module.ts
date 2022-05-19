import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app.routing.module";
import {ClimbersPageComponent} from './component/climbers-page/climbers-page.component';
import {AdminPageComponent} from './component/admin-page/admin-page.component';
import {EventListPageComponent} from './component/event-list-page/event-list-page.component';
import {ClimberPageComponent} from './component/climber-page/climber-page.component';
import {ClimberListPageComponent} from './component/admin-page/climber-list-page/climber-list-page.component';
import {SettingsPageComponent} from './component/admin-page/settings-page/settings-page.component';
import {
  UserRegistrationFormComponent
} from './component/admin-page/user-registration-form/user-registration-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxSliderModule} from '@angular-slider/ngx-slider';
import {LeaderboardsPageComponent} from './component/leaderboards-page/leaderboards-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ClimbersPageComponent,
    AdminPageComponent,
    EventListPageComponent,
    ClimberPageComponent,
    ClimberListPageComponent,
    SettingsPageComponent,
    UserRegistrationFormComponent,
    LeaderboardsPageComponent,
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        NgxSliderModule,
        FormsModule
    ],
  providers: [

  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
}
