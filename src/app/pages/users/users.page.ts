import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {User} from "../../shared/models/user.dto";
@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  users:User [] = []
  constructor(private  _serviceAuth:AuthService) {}

  ngOnInit() {
    this._serviceAuth.getAllUsers().subscribe({
      next: (response) => {
        console.log(response)
        this.users = response.filter(user => user.role === 'user').map(user => ({
          username: user.username,
          role: user.role,
          id: user.id
        }));
      },
      error: (err) => {
        console.log(err)

      },
    });
  }
  onAddUser():void{

  }
  onDeleteUser(userId?:string):void{

  }
}
