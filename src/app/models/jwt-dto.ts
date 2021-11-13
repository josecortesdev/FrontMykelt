export class JwtDTO {
  
  user: any;
  token: string;  // Esta va a tener un token
  name: any;
  role: any;

  constructor(user: any, token: string) {
    this.user = user;
    this.token = token;
  }
}
