import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EntryPageComponent} from "./entry-page/entry-page.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {path: 'entry', component: EntryPageComponent},
  {path: 'main', component: MainPageComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'entry'}
];

//todo Можно сделать ленивую подгрузку модуля Main
//todo Можно сделать страничку 404

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
