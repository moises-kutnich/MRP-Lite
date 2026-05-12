import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlaysComponent } from './plays/plays.component';
import { PlaysDetailComponent } from './plays/plays-detail.component';
import { BorderoDetailComponent } from './bordero/bordero-detail.component';

export const routes: Routes = [
    {path: '', component: HomeComponent },
    {path: 'plays', component: PlaysComponent},
    {path: 'plays/:id', component: PlaysDetailComponent},
    { path: 'borderos/:id', component: BorderoDetailComponent },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }