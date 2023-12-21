import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiKeysInterceptor } from './core/http-interceptor.interceptor';
import { RouteModule } from './routes/route/route.module'; 
import { MoviesModule } from './movies/movies.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouteModule,
    MoviesModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: ApiKeysInterceptor, multi: true
  }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
