import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/movies/pages/home/home.component';
import { LoginComponent } from 'src/app/auth/pages/login/login.component';

const routes: Routes = [
  {path: 'authenticate', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: '**', redirectTo: 'authenticate'}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  exports: [RouterModule]
})
export class RouteModule { }
