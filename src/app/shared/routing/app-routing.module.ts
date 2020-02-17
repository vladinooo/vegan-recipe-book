import {NgModule, ViewChild} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ForgotPasswordComponent} from "../../forgot-password/forgot-password.component";
import {VerifyEmailComponent} from "../../verify-email/verify-email.component";
import {AuthGuard} from "../guard/auth.guard";
import {LoginComponent} from "../../login/login.component";
import {JoinComponent} from "../../join/join.component";
import {HomeComponent} from "../../home/home.component";
import {AboutComponent} from "../../about/about.component";
import {RecipesComponent} from "../../recipe/recipes/recipes.component";
import {ContactComponent} from "../../contact/contact.component";
import {CreateRecipeComponent} from "../../recipe/create-recipe/create-recipe.component";
import {ViewRecipeComponent} from "../../recipe/view-recipe/view-recipe.component";
import {EditRecipeComponent} from "../../recipe/edit-recipe/edit-recipe.component";
import {ProfilesComponent} from "../../profile/profiles/profiles.component";
import {ProfileComponent} from "../../settings/profile/profile.component";
import {SettingsComponent} from "../../settings/settings.component";
import {SecurityComponent} from "../../settings/security/security.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'about', component: AboutComponent},
  { path: 'recipes', component: RecipesComponent},
  { path: 'recipes/:id', component: ViewRecipeComponent},
  { path: 'recipes/create', component: CreateRecipeComponent, canActivate: [AuthGuard]},
  { path: 'recipes/edit/:id', component: EditRecipeComponent, canActivate: [AuthGuard]},
  { path: 'contact', component: ContactComponent},
  { path: 'login', component: LoginComponent},
  { path: 'join', component: JoinComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'verify-email-address', component: VerifyEmailComponent},
  { path: 'profiles', component: ProfilesComponent, canActivate: [AuthGuard]},
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard], children: [
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
      { path: 'security', component: SecurityComponent, canActivate: [AuthGuard]},
    ]},
  { path: 'settings/:id/security', component: ProfileComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
