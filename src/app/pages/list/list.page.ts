import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from "../../shared/services/order.service";
import { AlertController, ToastController } from "@ionic/angular";
import { Order } from "../../shared/models/order.dto";

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
  standalone: false,
})
export class ListPage implements OnInit {
  @ViewChild('orderAddModal') orderAddModal!: HTMLIonModalElement;
  orders: Order[] = [];
  orderForm!: FormGroup;
  currentOrderId: string | null = null;
  currentDate: string = new Date().toISOString().split('T')[0]; // Get the current date in ISO format.

  constructor(
    private _orderService: OrderService,
    private alertController: AlertController,
    private toastController: ToastController,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.fetchOrders();
    this.orderForm = this.fb.group({
      orderNo: ['', Validators.required],
      cakeSize: ['', Validators.required],
      cakeContent: ['', Validators.required],
      orderDate: [this.currentDate, Validators.required],
      customerName: ['', Validators.required],
      customerPhone: ['', Validators.required],
      description: [''],
      balance: ['', Validators.required],
      deposit: [''],
      status: ['todo']
    });
  }

  fetchOrders() {
    this._orderService.getAllOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }

  addOrder() {
    const orderData = this.orderForm.value;
    this._orderService.createOrder(orderData).subscribe(
      (newOrder) => {
        this.orders.push(newOrder);
        this.showToast('Sipariş başarıyla eklendi!');
        this.orderAddModal.dismiss();
      },
      (error) => {
        this.showToast('Sipariş eklenirken bir hata oluştu!');
      }
    );
  }

  updateOrder() {
    if (this.currentOrderId) {
      const orderData = this.orderForm.value;
      this._orderService.updateOrder(this.currentOrderId, orderData).subscribe(
        (updatedOrder) => {
          const index = this.orders.findIndex(order => order.id === this.currentOrderId);
          if (index !== -1) {
            this.orders[index] = updatedOrder;
          }
          this.showToast('Sipariş başarıyla güncellendi!');
          this.orderAddModal.dismiss();
        },
        (error) => {
          this.showToast('Sipariş güncellenirken bir hata oluştu!');
        }
      );
    }
  }

  editOrder(orderId: string) {
    this.currentOrderId = orderId;
    const order = this.orders.find(order => order.id === orderId);
    if (order) {
      this.orderForm.patchValue(order);
      this.orderAddModal.present();
    }
  }

  deleteOrder(orderId: string) {
    this._orderService.deleteOrder(orderId).subscribe(() => {
      this.orders = this.orders.filter(order => order.id !== orderId);
      this.showToast('Sipariş başarıyla silindi!');
    });
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}
