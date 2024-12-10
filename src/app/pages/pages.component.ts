import { Component, OnInit } from '@angular/core';
import {
  NavController,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonTabBar,
  IonTabs,
  IonTabButton,
  IonLabel,
} from '@ionic/angular/standalone';
import { User } from '../shared/models/user.dto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  standalone: true,
  imports: [
    IonLabel,
    IonTabButton,
    IonTabs,
    IonTabBar,
    IonIcon,
    IonButton,
    IonButtons,
    IonTitle,
    IonToolbar,
    IonContent,
    IonHeader,
    CommonModule,
    FormsModule,
  ],
})
export class PagesComponent implements OnInit {
  userInfo: User = {};
  constructor(private _navCtrl: NavController) {}

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo') ?? '{}');
    console.log(this.userInfo);
  }
  onLogout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
    this._navCtrl.navigateForward('/login').then((r) => {});
  }
  onRefresh(): void {
    window.location.reload();
  }
}
