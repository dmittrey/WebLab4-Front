import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EntryPageComponent} from "./entry-page/entry-page.component";
import {MainPageComponent} from "./main-page/main-page.component";

const routes: Routes = [
  {path: 'entry', component: EntryPageComponent},
  {path: 'main', component: MainPageComponent},
  {path: '**', redirectTo: 'entry'}
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
