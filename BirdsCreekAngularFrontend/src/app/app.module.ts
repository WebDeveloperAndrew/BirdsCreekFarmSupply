import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminfooterComponent } from './components/adminfooter/adminfooter.component';
import { MainmenuComponent } from './components/mainmenu/mainmenu.component';
import { AdminmainmenuComponent } from './components/adminmainmenu/adminmainmenu.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { SearchresultComponent } from './components/searchresult/searchresult.component';
import { AdminhomeComponent } from './pages/admin/adminhome/adminhome.component';
import { AdminbrandsComponent } from './pages/admin/adminbrands/adminbrands.component';
import { AdminproductsComponent } from './pages/admin/adminproducts/adminproducts.component';
import { AdminpromotionsComponent } from './pages/admin/adminpromotions/adminpromotions.component';
import { AdminloginComponent } from './pages/admin/adminlogin/adminlogin.component';
import { AdminaddproductComponent } from './pages/admin/adminaddproduct/adminaddproduct.component';
import { AdmineditproductComponent } from './pages/admin/admineditproduct/admineditproduct.component';
import { AdminaddbrandComponent } from './pages/admin/adminaddbrand/adminaddbrand.component';
import { AdmineditbrandComponent } from './pages/admin/admineditbrand/admineditbrand.component';
import { AboutpageComponent } from './pages/aboutpage/aboutpage.component';
import { ContactpageComponent } from './pages/contactpage/contactpage.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ProductpageComponent } from './pages/productpage/productpage.component';
import { ProductspageComponent } from './pages/productspage/productspage.component';
import { SearchpageComponent } from './pages/searchpage/searchpage.component';
import { ChickspageComponent } from './pages/specials/chickspage/chickspage.component';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SeoService } from './seo.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrandresultComponent } from './components/brandresult/brandresult.component';
import { WoodpelletsComponent } from './pages/specials/woodpellets/woodpellets.component';
import { SummerfootwareComponent } from './pages/specials/summerfootware/summerfootware.component';
import { WinterfootwareComponent } from './pages/specials/winterfootware/winterfootware.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    AdminfooterComponent,
    MainmenuComponent,
    AdminmainmenuComponent,
    CarouselComponent,
    SearchresultComponent,
    AdminhomeComponent,
    AdminbrandsComponent,
    AdminproductsComponent,
    AdminpromotionsComponent,
    AdminloginComponent,
    AdminaddproductComponent,
    AdmineditproductComponent,
    AdminaddbrandComponent,
    AdmineditbrandComponent,
    AboutpageComponent,
    ContactpageComponent,
    HomepageComponent,
    NotfoundComponent,
    ProductpageComponent,
    ProductspageComponent,
    SearchpageComponent,
    ChickspageComponent,
    BrandresultComponent,
    WoodpelletsComponent,
    SummerfootwareComponent,
    WinterfootwareComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule.withServerTransition({ appId: 'birdscreekfarmsupply' }),
    FormsModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [SeoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
