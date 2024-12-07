import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import {FormsModule} from "@angular/forms";
import {PagesComponent} from "./pages.component";
import {IonicModule} from "@ionic/angular";
import localeTr from '@angular/common/locales/tr';
registerLocaleData(localeTr, 'tr');
@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    IonicModule
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'tr' } ],
  declarations:[PagesComponent]
})
export class PagesModule {}
