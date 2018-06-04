export class User {
  id: Number = 0;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;

  constructor(id: Number, firstName: string, lastName: string, email: string, username: string, password: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.username = username;
    this.password = password;
  }
}
