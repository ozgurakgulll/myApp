import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import {FormsModule} from "@angular/forms";
import {PagesComponent} from "./pages.component";
import {IonicModule} from "@ionic/angular";


@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    IonicModule
  ],
  providers: [],
  declarations:[PagesComponent]
})
export class PagesModule {}
