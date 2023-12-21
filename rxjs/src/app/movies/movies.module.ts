import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { CardComponent } from './components/card/card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomeComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    HomeComponent,
    CardComponent,
  ],
})
export class MoviesModule { }
