import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import {IonContent, IonHeader, IonRouterOutlet, IonTitle, IonToolbar} from "@ionic/angular/standalone";
import {FormsModule} from "@angular/forms";


@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    FormsModule,
    IonRouterOutlet
  ],
  providers: [],
  declarations:[]
})
export class PagesModule {}
