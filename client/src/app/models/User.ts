export class User {
  id: number = 0;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;

  constructor(id: number, firstName: string, lastName: string, email: string, username: string, password: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.username = username;
    this.password = password;
  }
}
