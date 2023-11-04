import { Injectable } from '@angular/core';
import { of } from 'rxjs';

interface UserList {
  userName: string;
  password: string;
  role: string;
}

interface Roles {
  role: string;
  element: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userList: UserList[] = [
    {
      userName: 'admin',
      password: '123456',
      role: 'admin',
    },
    {
      userName: 'user',
      password: '123456',
      role: 'user',
    },
  ];

  private roles: Roles[] = [
    {
      role: 'admin',
      element: 'create',
    },
    {
      role: 'admin',
      element: 'list',
    },
    {
      role: 'user',
      element: 'add-favorite',
    },
    {
      role: 'user',
      element: 'list',
    },
  ];
  constructor() {}

  login(userName: string, password: string) {
    const user = this.userList.find(
      (x) => x.userName === userName && x.password === password
    );

    if (user) return of(user);

    return of({ userName: 'Not Found', password: '', role: '' });
  }

  userAccessRights() {
    return of(this.roles);
  }
}
