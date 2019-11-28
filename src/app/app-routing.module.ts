import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserMovieComponent } from './user-movie-component/user-movie-comp';

const routes: Routes = [
  {
    path: 'usermovie',
    component: UserMovieComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
