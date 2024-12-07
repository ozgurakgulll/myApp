import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {ListPage} from "./list.page";
import {ListRoutingModule} from "./list-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [ListPage],
  imports: [CommonModule, IonicModule, ListRoutingModule, FormsModule, ReactiveFormsModule],
})
export class ListModule {}
