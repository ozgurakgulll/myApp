import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterComponent } from './master.component';
import { MasterRoutingModule } from './master-routing.module';
import {IonRouterOutlet} from "@ionic/angular/standalone";

@NgModule({
  declarations: [MasterComponent],
  imports: [
    CommonModule,
    MasterRoutingModule,
    IonRouterOutlet,
  ],
  providers: [],
})
export class MasterModule {}
