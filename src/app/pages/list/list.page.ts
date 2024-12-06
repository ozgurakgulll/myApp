import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
 standalone:false
})
export class ListPage implements OnInit {
  employees = [
    {
      id: 1,
      name: "Alan Montgomery",
      title: "Mobile Team Lead",
      avatar: "https://pbs.twimg.com/profile_images/1383061489469292548/5dhsPd4j_400x400.jpg"
    },
    {
      id: 2,
      name: "Max Lynch",
      title: "CEO | Co Founder",
      avatar: "https://pbs.twimg.com/profile_images/1318970727173885953/bln98FNj_400x400.jpg"
    },
    {
      id: 3,
      name: "Mike Hartington",
      title: "Senior Dev Rel",
      avatar: "https://pbs.twimg.com/profile_images/1084993841898446849/DJ8XtR6L_400x400.jpg"
    },
    {
      id: 4,
      name: "Matt Netkow",
      title: "Head of Product Marketing",
      avatar: "https://pbs.twimg.com/profile_images/1323383930150621187/GKc0nVzi_400x400.jpg"
    },
    {
      id: 5,
      name: "Ben Sperry",
      title: "CDO | Co Founder",
      avatar: "https://pbs.twimg.com/profile_images/1328390491126308864/jHHgl5Dm_400x400.jpg"
    },
    {
      id: 6,
      name: "Liam DeBeasi",
      title: "Software Engineer",
      avatar: "https://pbs.twimg.com/profile_images/1105953692669366273/ZNK4lRAJ_400x400.jpg"
    }
  ];

  results = [...this.employees];

  constructor() { }

  ngOnInit() {}

  remove(id: number) {
    // Animasyon eklemek için bir süre beklemek için setTimeout kullanabiliriz
    setTimeout(() => {
      this.results = this.results.filter(employee => employee.id !== id);
      this.employees = this.employees.filter(employee => employee.id !== id);
    }, 700);
  }

  search(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm !== '') {
      this.results = this.employees.filter(employee => employee.name.toLowerCase().includes(searchTerm));
    } else {
      this.results = [...this.employees];
    }
  }
}
