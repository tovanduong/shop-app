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
import { ProductListComponent } from './page/product/product-list/product-list.component';
import { ProductItemComponent } from './page/product/product-item/product-item.component';
import { CurrencyPipe } from './pipe/currency.pipe';
import { ProductDetailComponent } from './page/product/product-detail/product-detail.component';
import { LoadingComponent } from './component/loading/loading.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'cart',
    component: CartListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    FooterComponent,
    ProductListComponent,
    HeaderComponent,
    ProductItemComponent,
    ProductDetailComponent,
    CartListComponent,
    CurrencyPipe,
    LoadingComponent,
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
