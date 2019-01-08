import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { AboutpageComponent } from './pages/aboutpage/aboutpage.component';
import { ContactpageComponent } from './pages/contactpage/contactpage.component';
import { ProductspageComponent } from './pages/productspage/productspage.component';
import { ProductpageComponent } from './pages/productpage/productpage.component';
import { ChickspageComponent } from './pages/specials/chickspage/chickspage.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { SearchpageComponent } from './pages/searchpage/searchpage.component';
import { AdminloginComponent } from './pages/admin/adminlogin/adminlogin.component';
import { AdminhomeComponent } from './pages/admin/adminhome/adminhome.component';
import { AdminproductsComponent } from './pages/admin/adminproducts/adminproducts.component';
import { AdminbrandsComponent } from './pages/admin/adminbrands/adminbrands.component';
import { AdminpromotionsComponent } from './pages/admin/adminpromotions/adminpromotions.component';
import { AdminaddbrandComponent } from './pages/admin/adminaddbrand/adminaddbrand.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomepageComponent },
    { path: 'about', component: AboutpageComponent},
    { path: 'contact', component: ContactpageComponent},
    { path: 'products', component: ProductspageComponent},
    { path: 'chicks', component: ChickspageComponent},
    { path: 'search', component: SearchpageComponent},
    { path: 'product/:productid', component: ProductpageComponent},
    { path: 'about-us', redirectTo: '/about', pathMatch: 'full'},
    { path: 'testimonials', redirectTo: '/about', pathMatch: 'full'},
    { path: 'farm-supplies/#', redirectTo: '/products', pathMatch: 'full'},
    { path: 'pet-food-supplies', redirectTo: '/products', pathMatch: 'full'},
    { path: 'farm-supplies', redirectTo: '/products', pathMatch: 'full'},
    { path: 'saftey-work-wear', redirectTo: '/products', pathMatch: 'full'},
    { path: 'lawn-garden', redirectTo: '/products', pathMatch: 'full'},
    { path: 'quality-trailers-and-docks', redirectTo: '/products', pathMatch: 'full'},
    { path: 'contact-us', redirectTo: '/contact', pathMatch: 'full'},
    //ADMIN PATHS
    { path: 'admin/login', component: AdminloginComponent },
    { path: 'admin/home', component: AdminhomeComponent },
    { path: 'admin/products', component: AdminproductsComponent },
    { path: 'admin/brands', component: AdminbrandsComponent },
    { path: 'admin/addbrand', component: AdminaddbrandComponent },
    { path: 'admin/promotions', component: AdminpromotionsComponent },
    { path: 'admin/editproduct', component: AdminpromotionsComponent },
    /*
    { path: 'admin/home', redirectTo: 'admin/login/:home', pathMatch: 'full'},
    { path: 'admin/products', redirectTo: 'admin/login/:products', pathMatch: 'full' },
    { path: 'admin/brands', redirectTo: 'admin/login/:brands', pathMatch: 'full' },
    { path: 'admin/promotions', redirectTo: 'admin/login/:home', pathMatch: 'full'},
    */
    //404 Catch all
    { path: '404', component: NotfoundComponent},
    { path: '**', redirectTo: '/404',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
