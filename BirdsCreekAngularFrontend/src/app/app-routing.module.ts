import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { AboutpageComponent } from './pages/aboutpage/aboutpage.component';
import { ContactpageComponent } from './pages/contactpage/contactpage.component';
import { ProductspageComponent } from './pages/productspage/productspage.component';
import { ProductpageComponent } from './pages/productpage/productpage.component';
import { ChickspageComponent } from './pages/specials/chickspage/chickspage.component';
import { SummerfootwareComponent } from './pages/specials/summerfootware/summerfootware.component';
import { WinterfootwareComponent } from './pages/specials/winterfootware/winterfootware.component';
import { WoodpelletsComponent } from './pages/specials/woodpellets/woodpellets.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { SearchpageComponent } from './pages/searchpage/searchpage.component';
import { AdminloginComponent } from './pages/admin/adminlogin/adminlogin.component';
import { AdminhomeComponent } from './pages/admin/adminhome/adminhome.component';
import { AdminproductsComponent } from './pages/admin/adminproducts/adminproducts.component';
import { AdminbrandsComponent } from './pages/admin/adminbrands/adminbrands.component';
import { AdminpromotionsComponent } from './pages/admin/adminpromotions/adminpromotions.component';
import { AdminaddbrandComponent } from './pages/admin/adminaddbrand/adminaddbrand.component';
import { AdmineditbrandComponent } from './pages/admin/admineditbrand/admineditbrand.component';
import { AdminaddproductComponent } from './pages/admin/adminaddproduct/adminaddproduct.component';
import { AdmineditproductComponent } from './pages/admin/admineditproduct/admineditproduct.component';
import { AuthGuardService } from './auth-guard.service';
import { ReverseAuthGuardService } from './reverse-auth-guard.service';
import { AdminsettingsComponent } from './pages/admin/adminsettings/adminsettings.component';
import { AdminusersComponent } from './pages/admin/adminusers/adminusers.component';
import { AdminaddusersComponent } from './pages/admin/adminaddusers/adminaddusers.component';
import { AdmineditusersComponent } from './pages/admin/admineditusers/admineditusers.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomepageComponent },
    { path: 'about', component: AboutpageComponent},
    { path: 'contact', component: ContactpageComponent},
    { path: 'products', component: ProductspageComponent},
    { path: 'chicks', component: ChickspageComponent},
    { path: 'summerfootware', component: SummerfootwareComponent},
    { path: 'winterfootware', component: WinterfootwareComponent},
    { path: 'woodpellets', component: WoodpelletsComponent},
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
    { path: 'admin/login', canActivate: [ReverseAuthGuardService],component: AdminloginComponent },
    { path: 'admin/home',canActivate: [AuthGuardService], component: AdminhomeComponent },
    { path: 'admin/products',canActivate: [AuthGuardService], component: AdminproductsComponent },
    { path: 'admin/addproduct',canActivate: [AuthGuardService], component: AdminaddproductComponent },
    { path: 'admin/editproduct/:productid',canActivate: [AuthGuardService], component: AdmineditproductComponent },
    { path: 'admin/brands',canActivate: [AuthGuardService], component: AdminbrandsComponent },
    { path: 'admin/addbrand',canActivate: [AuthGuardService], component: AdminaddbrandComponent },
    { path: 'admin/editbrand/:brandname',canActivate: [AuthGuardService], component: AdmineditbrandComponent },
    { path: 'admin/promotions',canActivate: [AuthGuardService], component: AdminpromotionsComponent },
    { path: 'admin/editproduct',canActivate: [AuthGuardService], component: AdminpromotionsComponent },
    { path: 'admin/settings',canActivate: [AuthGuardService], component: AdminsettingsComponent },
    { path: 'admin/users',canActivate: [AuthGuardService], component: AdminusersComponent },
    { path: 'admin/adduser',canActivate: [AuthGuardService], component: AdminaddusersComponent },
    { path: 'admin/edituser/:username',canActivate: [AuthGuardService], component: AdmineditusersComponent },
    { path: 'admin', children:[{path:"",redirectTo: '/admin/login',pathMatch: 'full'},{path:"**",redirectTo: '/admin/login',pathMatch: 'full'}]},
    { path: 'login', redirectTo: '/admin/login', pathMatch: 'full'},
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
