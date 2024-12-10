import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { PortalModule } from './portal/portal.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClient, HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { InterceptorService } from './inteceptors/interceptor.service';

@NgModule({ declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent], imports: [AppRoutingModule,
        AuthModule,
        BrowserModule,
        PortalModule,
        BrowserAnimationsModule], 
        providers: [
            {
                provide: LocationStrategy,
                useClass: HashLocationStrategy
            },
            {
                provide: HTTP_INTERCEPTORS,
                useClass: InterceptorService,
                multi: true
            },
            provideHttpClient(withInterceptorsFromDi()),
        ] })
export class AppModule { }
