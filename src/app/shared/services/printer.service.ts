import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Socket } from '@spryrocks/capacitor-socket-connection-plugin';
import { EscService } from './esc.service';
import { Order } from '../models/order.dto';

@Injectable({
  providedIn: 'root',
})
export class PrinterService {
  http = inject(HttpClient);
  escService = inject(EscService);
  terminalIp = '192.168.1.44';

  constructor() {}

  async printOrder(order: Order) {
    const formattedOrder = await this.escService.formatOrder(order);
    if (Capacitor.isNativePlatform()) {
      this.printToNativeAppV2(formattedOrder);
    } else {
      this.printToServerV2(formattedOrder);
    }
  }

  printToNativeAppV2(printStr: Uint8Array) {
    let socketId = 0;
    return new Promise(async (resolve, reject) => {
      let socket = new Socket();
      socket.onClose = () => {
        console.log('closed!');
      };
      socket.onError = (error) => {
        reject(error);
      };
      socket.onData = (data) => {
        console.log('addListener_onReceive', this.bin2String(data));
        resolve(this.bin2String(data));
      };
      socket.onStateChanged = async (state) => {
        if (state == 'opened') {
          await socket.write(printStr);
          await socket.close();
          console.log('Printed!: ' + this.bin2String(printStr));
          resolve('Printed!');
        }
        if (state == 'error') {
          reject('Connection Error');
        }
      };
      await socket.open(this.terminalIp + '', 9100);
    });
  }

  async printToServerV2(printData: Uint8Array) {
    return new Promise(async (resolve, reject) => {
      try {
        let httpOptions = {
          headers: new HttpHeaders({
            'content-type': 'application/json',
            accept: 'application/json',
          }),
        };
        let body = JSON.stringify({
          printStr: printData.toString(),
          ipAddress: this.terminalIp,
          port: 9100,
          copyCount: 1,
        });

        await this.http
          .post(
            'http://' + '127.0.0.1' + ':1400/api/printer/printV2',
            body,
            httpOptions
          )
          .subscribe(
            (data: any) => {
              console.log('print result:', data);
              if (data.statusCode == '200') {
                // this.globalService.toast(
                //     '',
                //     'Sipariş Yazıdırıldı.',
                //     'bottom',
                //     'success'
                // );
                resolve(true);
              } else {
                reject(false);
              }
            },
            (error) => {
              console.error('print error:', error);
              reject(false);
            }
          );
      } catch (err) {
        console.error('print-error:', err);
        reject(err);
      }
    });
  }

  utf8_to_b64(str: string) {
    return window.btoa(unescape(encodeURIComponent(str)));
  }

  bin2String(array: Uint8Array) {
    var result = '';
    for (var i = 0; i < array.length; i++) {
      result += String.fromCharCode(parseInt(String(array[i]), 2));
    }
    return result;
  }
}
