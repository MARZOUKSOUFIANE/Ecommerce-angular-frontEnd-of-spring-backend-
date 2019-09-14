import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public users=[
    {username:'admin',password:'1234',roles:['ADMIN','USER']},
    {username:'user1',password:'1234',roles:['USER']},
    {username:'user2',password:'1234',roles:['USER']}
  ];

  public isAuthenticated:boolean;
  public userAuthenticated;
  public token:object;

  constructor() { }

  public login(username:string,password:string){
    let user=undefined;
    this.users.forEach(u=>{
      if(u.username==username && u.password==password){
        user=u;
        this.token={username:u.username,roles:u.roles}
      }
    });
    if(user){
      this.isAuthenticated=true;
      this.userAuthenticated=user;
    }
    else{
      this.isAuthenticated=false;
      this.userAuthenticated=undefined;
    }
  }

  public isAdmin() {
    if (this.userAuthenticated) {
      if (this.userAuthenticated.roles.indexOf('ADMIN') > -1) {
        return true;
      }
      return false;
    }
  }

    public saveAuthenticatedUser(){
      localStorage.setItem('authUser',btoa(JSON.stringify(this.token)));
    }

    public loadAuthenticatedUserFromLocalStorage() {
    let token=localStorage.getItem('authUser');
    if(token){
      let user=JSON.parse(atob(token));
      this.userAuthenticated={username:user.username,roles:user.roles};
      this.isAuthenticated=true;
    }
    }

    public removeTokenFromLocalStorage(){
      localStorage.removeItem('authUser');
      this.isAuthenticated=false;
      this.token=undefined;
      this.userAuthenticated=undefined;
    }

}
