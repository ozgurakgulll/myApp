import { Injectable } from '@angular/core';
import { Order } from '../models/order.dto';
import EscPosEncoder from '@manhnd/esc-pos-encoder';
import { isNumber } from 'lodash';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class EscService {
  maxLength = 32;
  colsNomal = 48;
  colsCondensed = 64;
  colsExpanded = 24;
  twoColPad = 10;

  constructor() {}

  async formatOrder(order: Order) {
    let encoder = new EscPosEncoder();
    moment.locale('tr');
    //initialize and lang set
    encoder = encoder.initialize();

    let height = 0;
    let img: any = await new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = '/assets/logo.svg';
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
    height = img.height / (img.width / 320);
    height -= height % 8;
    //TODO: witdh hesaplamasini da otomatik yap
    //let sonuc = height % 8
    //console.log("iamge-w-h", img.width, img.height)
    //console.log("calc-width", height, sonuc)
    encoder = encoder.align('center').image(img, 320, height, 'atkinson');

    // Başlangıç, başlık ve logo (isteğe bağlı)
    encoder = encoder
      .align('center')
      .bold(true)
      .text(this.convertTRK('İzmir İncisi'))
      .newline()
      .bold(false)
      .text(this.convertTRK('Sipariş Fişi'))
      .newline()
      .text(this.convertTRK('Instagram: @izmirincisifirin'))
      .newline()
      .newline()
      .align('left') // Metni sola hizala

      // Dinamik bilgiler
      .text(
        this.convertTRK('Pasta Ebatı: ') +
          order.cakeSize +
          ''.repeat(
            this.colsNomal -
              (this.convertTRK('Pasta Ebatı: ').length +
                (order.cakeSize?.length ?? 0))
          )
      )
      .newline();

    encoder
      .text('-'.repeat(this.colsNomal))
      .newline()
      .text(
        this.convertTRK('Pasta İçeriği: ') +
          order.cakeSize +
          ''.repeat(
            this.colsNomal -
              ('Pasta Ebatı: '.length + (order.cakeSize?.length ?? 0))
          )
      )
      .newline();

    encoder
      .text('-'.repeat(this.colsNomal))
      .newline()
      .text(
        this.convertTRK(
          `Tarih: ${moment(order.orderDate).format(
            'DD/MM/YYYY'
          )} | Gün: ${moment(order.orderDate).format('dddd')} | Saat: ${moment(
            order.orderDate
          ).format('HH:mm')}`
        )
      )
      .newline();
    // encoder
    //   .text('-'.repeat(this.colsNomal))
    //   .newline()
    //   .text(this.convertTRK('Saat: ' + moment(order.orderDate).format('HH:mm')))
    //   .newline();
    encoder
      .text('-'.repeat(this.colsNomal))
      .newline()
      .text('Kapora: ' + order.deposit)
      .newline();
    encoder
      .text('-'.repeat(this.colsNomal))
      .newline()
      .text(this.convertTRK('Kalan Ödeme: ') + order.balance)
      .newline();
    encoder
      .text('-'.repeat(this.colsNomal))
      .newline()
      .text(
        this.convertTRK('Sipariş Veren Adı-Soyadı: ') +
          this.convertTRK(order.customerName)
      )
      .newline();
    encoder
      .text('-'.repeat(this.colsNomal))
      .newline()
      .text(this.convertTRK('Telefon Numarası: ') + order.customerPhone)
      .newline();
    encoder
      .text('-'.repeat(this.colsNomal))
      .newline()
      .text(
        this.convertTRK('Sipariş Alan Sorumlu Adı: ') +
          this.convertTRK(order.createdBy?.username)
      )
      .newline();
    encoder
      .text('-'.repeat(this.colsNomal))
      .newline()
      .text(this.convertTRK('Açıklama: '))
      .newline();
    encoder.text('-'.repeat(this.colsNomal)).newline();
    encoder.text(this.convertTRK(order.description)).newline().newline();

    // // Seperator
    // encoder = encoder.bold(false).size(0); //reset bold
    // encoder = encoder.text('-'.repeat(this.colsNomal)).newline();

    let utf8Encode = new TextEncoder();
    let bytes = utf8Encode.encode(
      String.fromCharCode(27) +
        String.fromCharCode(66) +
        String.fromCharCode(3) +
        String.fromCharCode(2)
    );
    encoder = encoder.raw(Array.from(bytes));
    //end Zreport
    encoder.cutPartial();
    return encoder.encode();
  }

  round(value: number, decimals: number) {
    try {
      let rnd: any = value + 'e' + decimals;
      return Number(Math.round(rnd) + 'e-' + decimals);
    } catch (err) {
      throw err;
    }
  }

  getCurStr(value: number) {
    if (isNumber(value)) {
      let returnVal = value.toLocaleString(
        undefined, // leave undefined to use the browser"s locale,
        // or use a string like "en-US" to override it.
        { minimumFractionDigits: 2 }
      );
      return returnVal;
    }

    return '';
  }

  convertTRK(data: string | undefined) {
    if (data) {
      data = data.replace(/İ/g, 'I');
      data = data.replace(/ı/g, 'i');
      data = data.replace(/Ü/g, 'U');
      data = data.replace(/ü/g, 'u');
      data = data.replace(/ş/g, 's');
      data = data.replace(/Ş/g, 'S');
      data = data.replace(/Ö/g, 'O');
      data = data.replace(/ö/g, 'o');
      data = data.replace(/ğ/g, 'g');
      data = data.replace(/Ğ/g, 'G');
      data = data.replace(/ç/g, 'c');
      data = data.replace(/Ç/g, 'C');
      return data;
    } else {
      return '';
    }
  }

  str2arrayBuffer(str: string): ArrayBuffer {
    var buf = new ArrayBuffer(str.length);
    var bufView = new Uint8Array(buf);
    for (var i = 0; i < str.length; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }
}
