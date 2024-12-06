import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/order.dto';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
  standalone: false,
})
export class ListPage implements OnInit {
  employees: Order[] = [];

  results = [...this.employees];

  constructor() {}

  ngOnInit() {}

  remove(id: string) {
    // Animasyon eklemek için bir süre beklemek için setTimeout kullanabiliriz
    setTimeout(() => {
      this.results = this.results.filter((employee) => employee.id !== id);
      this.employees = this.employees.filter((employee) => employee.id !== id);
    }, 700);
  }

  search(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm !== '') {
      this.results = this.employees.filter((employee) =>
        employee.customerName.toLowerCase().includes(searchTerm)
      );
    } else {
      this.results = [...this.employees];
    }
  }
}
