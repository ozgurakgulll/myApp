import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() label: string='';
  setUser(): void {
    localStorage.setItem('user', JSON.stringify({ id: 1, name: 'John Doe', token: 'abc123' }));
    window.location.href = '/list';
  }
}
