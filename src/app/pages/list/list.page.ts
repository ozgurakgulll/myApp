import {
  AfterContentInit,
  Component,
  DoCheck,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OrderService } from '../../shared/services/order.service';
import { Order, ORDER_STATUS } from '../../shared/models/order.dto';
import { LastUpdate } from '../../shared/models/user.dto';
import domtoimage from 'dom-to-image';
import { Share } from '@capacitor/share';
import { Capacitor } from '@capacitor/core';
import { PrinterService } from 'src/app/shared/services/printer.service';
import {
  AlertController,
  IonPopover,
  ToastController,
  IonCard,
  IonCardContent,
  IonContent,
  IonItem,
  IonIcon,
  IonModal,
  IonFooter,
  IonDatetimeButton,
  IonSelectOption,
  IonSearchbar,
  IonList,
  IonSelect,
  IonDatetime,
} from '@ionic/angular/standalone';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
  standalone: true,
  imports: [
    IonDatetime,
    IonList,
    IonDatetimeButton,
    IonFooter,
    IonModal,
    IonIcon,
    IonItem,
    IonContent,
    IonCardContent,
    IonCard,
    IonSelectOption,
    IonSearchbar,
    IonPopover,
    IonSelect,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ListPage implements OnInit {
  @ViewChild('orderAddModal') orderAddModal!: HTMLIonModalElement;
  @ViewChild('popover') popover!: IonPopover;
  orders: Order[] = [];
  selectOrder!: Order | null;
  orderForm!: FormGroup;
  currentOrderId: string | null = null;
  currentDate: string = new Date().toISOString().split('.')[0];
  lastUpdate: LastUpdate[] = [];
  isMobile = Capacitor.isNativePlatform();
  constructor(
    private _orderService: OrderService,
    private toastController: ToastController,
    private fb: FormBuilder,
    private printerService: PrinterService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.fetchOrders();
    this.orderForm = this.fb.group({
      orderNo: [''],
      cakeSize: ['', Validators.required],
      cakeContent: ['', Validators.required],
      orderDate: [this.currentDate, Validators.required],
      customerName: ['', Validators.required],
      customerPhone: ['', Validators.required],
      description: [''],
      balance: [0, Validators.required],
      deposit: [0],
      status: ['todo', Validators.required],
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
        this.fetchOrders();
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
          const index = this.orders.findIndex(
            (order) => order.id === this.currentOrderId
          );
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

  editOrder(orderId: string, updated: LastUpdate[]) {
    this.lastUpdate = updated;
    this.currentOrderId = orderId;
    const order = this.orders.find((order) => order.id === orderId);
    if (order) {
      const formattedDate = order.orderDate
        ? new Date(order.orderDate).toISOString().slice(0, 16)
        : '';

      this.orderForm.patchValue({
        ...order,
        orderDate: formattedDate,
      });
      this.orderAddModal.present();
    }
  }

  deleteOrder(orderId: string) {
    this._orderService.deleteOrder(orderId).subscribe(() => {
      this.orders = this.orders.filter((order) => order.id !== orderId);
      this.showToast('Sipariş başarıyla silindi!');
    });
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }
  openNewOrderModal() {
    this.currentOrderId = null;
    this.orderForm.reset({
      orderNo: '',
      cakeSize: '',
      cakeContent: '',
      orderDate: this.currentDate,
      customerName: '',
      customerPhone: '',
      description: '',
      balance: 0,
      deposit: 0,
      status: 'todo',
    });
    this.orderAddModal.present();
  }
  openPopover(order: Order) {
    this.selectOrder = order;
    this.popover.present();
  }

  updateStatus(orderId: string, status: ORDER_STATUS) {
    this._orderService
      .updateOrder(orderId, {
        status,
      })
      .subscribe(
        (updatedOrder) => {
          const index = this.orders.findIndex(
            (order) => order.id === this.currentOrderId
          );
          if (index !== -1) {
            this.orders[index] = updatedOrder;
          }
          this.showToast('Sipariş başarıyla güncellendi!');
          this.fetchOrders();
        },
        (error) => {
          this.showToast('Sipariş güncellenirken bir hata oluştu!');
        }
      );
  }

  filterForm = this.fb.group({
    orderDate: [new Date().toISOString()],
    status: [],
    search: [],
  });
  isDetailFilterShown = false;
  applyFilter() {
    this._orderService
      .getAllOrdersWithFilter(this.removeNullValues(this.filterForm.value))
      .subscribe((orders) => {
        this.orders = orders;
      });
  }

  removeNullValues(obj: Record<string, any>): Record<string, any> {
    // Yeni bir nesne oluştur ve yalnızca null olmayan değerleri ekle
    return Object.entries(obj)
      .filter(([_, value]) => value !== null) // null değerleri filtrele
      .reduce((acc, [key, value]) => {
        acc[key] = value; // Kalan anahtar-değer çiftlerini yeni nesneye ekle
        return acc;
      }, {} as Record<string, any>);
  }

  async shareOrder(modalRef: any, popoverRef: any) {
    popoverRef.dismiss();
    await modalRef.present();
    console.log(this.selectOrder);
  }

  share() {
    let previewRef = document.querySelector('#order-share .order-preview');
    if (!previewRef) return;
    (previewRef as HTMLDivElement).style.transform = 'scale(1)';
    domtoimage
      .toJpeg(document.querySelector('#order-share .order-preview')!, {
        quality: 1,
      })
      .then(async (res) => {
        try {
          if (Capacitor.isNativePlatform()) {
            const cachedFile = await Filesystem.writeFile({
              data: res,
              path: 'siparis-no-' + new Date().getMilliseconds() + '.jpg',
              directory: Directory.Cache,
            });
            await Share.share({
              text: 'Sipariş Numarası: ' + this.selectOrder?.orderNo,
              url: cachedFile.uri,
            });
          } else {
            const blob = this.b64toBlob(res, 'image/png');
            console.log(blob.type);
            const data = {
              files: [
                new File(
                  [blob],
                  'siparis-no-' + this.selectOrder?.orderNo + '.png',
                  {
                    type: blob.type,
                  }
                ),
              ],
            };
            if (!navigator.canShare(data)) {
              throw new Error("Can't share data." + data);
            }
            await navigator.share(data);
          }
        } catch (err: any) {
          console.error(err.name, err.message);
        } finally {
          (previewRef as HTMLDivElement).style.transform = 'scale(0.7)';
        }
      });
  }

  async print() {
    this.popover.dismiss();
    const alertRef = await this.alertController.create({
      header: 'Yazıcı IP',
      message: 'ESC Terminal yazıcı ip adresi girerek yazdırabilirsiniz',
      inputs: [
        {
          value: '192.168.1.100',
          name: 'terminalIp',
        },
      ],
      buttons: [
        {
          text: 'İptal',
          role: 'cancel',
        },
        {
          text: 'Onayla',
          handler: (value) => {
            if (value.terminalIp.length > 0) {
              this.printerService.terminalIp = value.terminalIp;
              if (!this.selectOrder) return;
              this.printerService.printOrder(this.selectOrder);
              return true;
            }
            return false;
          },
        },
      ],
    });

    await alertRef.present();
  }

  b64toBlob = (b64Data: string, contentType = '', sliceSize = 512) => {
    b64Data = b64Data.split(',')[1];
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };
}
