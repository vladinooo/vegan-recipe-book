import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './shared/routing/app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { RecipesComponent } from './recipe/recipes/recipes.component';
import { LoginComponent } from './login/login.component';
import { JoinComponent } from './join/join.component';
import { ContactComponent } from './contact/contact.component';
import { ViewRecipeComponent } from './recipe/view-recipe/view-recipe.component';
import { EditRecipeComponent } from './recipe/edit-recipe/edit-recipe.component';
import {CreateRecipeComponent} from "./recipe/create-recipe/create-recipe.component";
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import {AngularFontAwesomeModule} from "angular-font-awesome";
import {AuthGuard} from "./shared/guard/auth.guard";
import {FormsModule} from "@angular/forms";
import { ProfilesComponent } from './profile/profiles/profiles.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { ProfileComponent } from './settings/profile/profile.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { SettingsComponent } from './settings/settings.component';
import { SecurityComponent } from './settings/security/security.component';
import {AngularFireStorageModule} from "@angular/fire/storage";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    RecipesComponent,
    ViewRecipeComponent,
    CreateRecipeComponent,
    EditRecipeComponent,
    ContactComponent,
    LoginComponent,
    JoinComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    NavbarComponent,
    FooterComponent,
    ProfilesComponent,
    LoadingSpinnerComponent,
    ProfileComponent,
    SettingsComponent,
    SecurityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    FormsModule,
    NgbModule,
    AngularFireStorageModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
