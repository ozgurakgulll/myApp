import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { User } from "../../shared/models/user.dto";
import { AlertController, ToastController, ModalController } from "@ionic/angular";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  @ViewChild('userAddModal') userAddModal!: HTMLIonModalElement;

  users: User[] = [];
  userForm: FormGroup;
  showPassword: boolean = false;
  currentUserRole: string = '';

  constructor(
    private _serviceAuth: AuthService,
    private alertController: AlertController,
    private toastController: ToastController,
    private fb: FormBuilder
  ) {
    // Form Oluşturma ve Validasyon Kuralları
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      fullname: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['user', Validators.required],
    });
  }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    this.currentUserRole = userInfo.role;
    this._serviceAuth.getAllUsers().subscribe({
      next: (response) => {
        this.users = response
          .filter(user => user.id !== userInfo.id)
          .map(user => ({
            username: user.username,
            fullname: user.fullname || '',
            role:user.role,
            id: user.id,
          }));
      },
      error: (err) => console.error(err),
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async onDeleteUser(userId?: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Kullanıcı Sil',
      message: 'Bu kullanıcıyı silmek istediğinizden emin misiniz?',
      buttons: [
        { text: 'İptal', role: 'cancel' },
        {
          text: 'Sil',
          handler: () => {
            this._serviceAuth.deleteUser(userId || '').subscribe({
              next: async () => {
                this.users = this.users.filter(user => user.id !== userId);
                const toast = await this.toastController.create({
                  message: 'Kullanıcı başarıyla silindi.',
                  duration: 2000,
                  color: 'success',
                });
                await toast.present();
              },
              error: (err) => console.error(err),
            });
          },
        },
      ],
    });

    await alert.present();
  }

  closeModal() {
    this.userAddModal.dismiss();
  }

  onAddUser() {
    if (this.userForm.valid) {
      const newUser: User = this.userForm.value;
      this._serviceAuth.createUser(newUser).subscribe({
        next: async (response) => {
          this.users.push(response);
          const toast = await this.toastController.create({
            message: 'Kullanıcı başarıyla eklendi.',
            duration: 2000,
            color: 'success',
          });
          await toast.present();
          this.closeModal();
          this.userForm.reset();
        },
        error: async (err) => {
          console.error(err);
          const toast = await this.toastController.create({
            message: 'Kullanıcı eklenirken hata oluştu.',
            duration: 2000,
            color: 'danger',
          });
          await toast.present();
        },
      });
    } else {
      this.userForm.markAllAsTouched();
    }
  }
}
