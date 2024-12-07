export class User {
  readonly id?: string = '';
  username?: string = '';
  fullname?: string = '';
  role?:'user'|'admin'|'superAdmin'
  password?: string = '';
}
