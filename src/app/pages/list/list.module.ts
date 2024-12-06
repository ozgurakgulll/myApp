import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {ListPage} from "./list.page";
import {ListRoutingModule} from "./list-routing.module";

@NgModule({
  declarations: [ListPage],
  imports: [CommonModule, IonicModule,ListRoutingModule],
})
export class ListModule {}
