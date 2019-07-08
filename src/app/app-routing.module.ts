import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompoundingCompComponent } from './compounding-comp/compounding-comp.component';

const routes: Routes = [
  {
    path: 'Compounding',
    component: CompoundingCompComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
