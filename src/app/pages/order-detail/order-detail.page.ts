import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {
  @Input() orderId: string = '';

  constructor() {}

  ngOnInit() {
    console.log(this.orderId);
  }
}
