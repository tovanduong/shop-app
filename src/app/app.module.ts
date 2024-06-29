import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './page/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './page/authen/login/login.component';
import { FooterComponent } from './component/layout/footer/footer.component';
import { AuthGuardService } from './service/auth-guard.service';
import { HeaderComponent } from './component/layout/header/header.component';
import { CartListComponent } from './page/cart-manage/cart-list/cart-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'cart', 
    component: CartListComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    // RouterModule.forRoot([
    //   { path: '', redirectTo: '/home', pathMatch: 'full' },
    //   { path: 'home', component: HomeComponent },
    //   { path: 'login', component: LoginComponent },
    // ]),
    RouterModule.forRoot(routes),
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
