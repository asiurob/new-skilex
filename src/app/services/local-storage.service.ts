import { Injectable } from '@angular/core';
import { Employee } from '../components/landing-page/employees/employees.interface';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public getData(): Employee {

    const user: Employee = {
      name: localStorage.getItem('name'),
      id: localStorage.getItem('id'),
      lastName: localStorage.getItem('lastName'),
      area: localStorage.getItem('area'),
      role: localStorage.getItem('role'),
      token: localStorage.getItem('token'),
      photo: localStorage.getItem('photo')
    };
    return user;
  }

  public setData( user: Employee ): void {
    localStorage.setItem('area', user.area );
    localStorage.setItem('role', user.role );
    localStorage.setItem('name', user.name );
    localStorage.setItem('lastName', user.lastName );
    localStorage.setItem('token', user.token );
    localStorage.setItem('id', user.id );
    localStorage.setItem('photo', user.photo);
  }

  public deleteData(): void {
    localStorage.removeItem('area');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    localStorage.removeItem('lastName');
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('photo');
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public getIndex( index: string ): string {
    return localStorage.getItem( index );
  }

}
