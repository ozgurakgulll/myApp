import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from "../../shared/services/order.service";
import {IonPopover, ToastController} from "@ionic/angular";
import { Order } from "../../shared/models/order.dto";
import {LastUpdate} from "../../shared/models/user.dto";

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
  standalone: false,
})
export class ListPage implements OnInit {
  @ViewChild('orderAddModal') orderAddModal!: HTMLIonModalElement;
  @ViewChild('popover') popover!: IonPopover;
  orders: Order[] = [];
  selectOrder!: Order;
  orderForm!: FormGroup;
  currentOrderId: string | null = null;
  currentDate: string = new Date().toISOString().split('.')[0]
  lastUpdate:LastUpdate[]=[]
  constructor(
    private _orderService: OrderService,
    private toastController: ToastController,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.fetchOrders();
    this.orderForm = this.fb.group({
      orderNo: [''],
      cakeSize: ['6', Validators.required],
      cakeContent: ['Çikolatalı', Validators.required],
      orderDate: [this.currentDate, Validators.required],
      customerName: ['', Validators.required],
      customerPhone: ['', Validators.required],
      description: [''],
      balance: ['0', Validators.required],
      deposit: ['0'],
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
        this.fetchOrders()
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
          this.fetchOrders();
        },
        (error) => {
          this.showToast('Sipariş güncellenirken bir hata oluştu!');
        }
      );
    }
  }

  editOrder(orderId: string,updated:LastUpdate[]) {
    this.lastUpdate=updated
    this.currentOrderId = orderId;
    const order = this.orders.find(order => order.id === orderId);
    if (order) {
      const formattedDate = order.orderDate
        ? new Date(order.orderDate).toISOString().slice(0, 16)
        : '';

      this.orderForm.patchValue({
        ...order,
        orderDate: formattedDate
      });
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
  openNewOrderModal() {
    this.currentOrderId = null;
    this.orderForm.reset({
      orderNo: '',
      cakeSize: '6',
      cakeContent: 'Çikolatalı',
      orderDate: this.currentDate,
      customerName: '',
      customerPhone: '',
      description: '',
      balance: '0',
      deposit: '0',
      status: 'todo'
    });
    this.orderAddModal.present();
  }
  openPopover(order: Order) {
    this.selectOrder=order
    this.popover.present();
  }
}
