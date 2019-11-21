import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompoundingCompComponent } from './compounding-comp/compounding-comp.component';
import { UserMovieComponent } from './user-movie-component/user-movie-comp'
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SearchByTitle } from './shared/search.pipe';




@NgModule({
  declarations: [
    AppComponent,
    CompoundingCompComponent,
    UserMovieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [SearchByTitle],
  bootstrap: [AppComponent]
})
export class AppModule { }
