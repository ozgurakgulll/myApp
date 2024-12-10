import { Component, OnInit } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { User } from '../shared/models/user.dto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
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
