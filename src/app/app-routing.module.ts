import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompoundingCompComponent } from './compounding-comp/compounding-comp.component';
import { UserMovieComponent } from './user-movie-component/user-movie-comp';

const routes: Routes = [
  {
    path: 'Compounding',
    component: CompoundingCompComponent,
  },
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
