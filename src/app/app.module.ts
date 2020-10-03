import { ProfileSettingsModule } from './Modules/profile-settings/profile-settings.module';
import { HelperModule } from './Modules/helper/helper.module';
import { httpInterceptorProviders } from './Modules/authentication/Interceptor/InterceptorProvider';
import { SurveyModule } from './Modules/survey/survey.module';
import { AuthenticationModule } from './Modules/authentication/authentication.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from '../app/Modules/material/material.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment'
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  AmazonLoginProvider,
} from 'angularx-social-login';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AuthenticationModule,
    HttpClientModule,
    SurveyModule,
    SocialLoginModule,
    HelperModule,
    ProfileSettingsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: true,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '471172821639-k4ee78c4kqq22pj7n8580hp2o5jqa5gk.apps.googleusercontent.com'
          ),
        },
      ],
    } as SocialAuthServiceConfig,
  },httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
