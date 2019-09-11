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
      last_name: localStorage.getItem('last_name'),
      area: localStorage.getItem('area'),
      role: localStorage.getItem('role'),
      token: localStorage.getItem('token'),
      photo: localStorage.getItem('photo'),
      normalizedToLink: localStorage.getItem('normalizedToLink'),
      hierarchy: localStorage.getItem('hierarchy')
    };
    return user;
  }

  public setData( user: Employee ): void {
    localStorage.setItem('area', user.area );
    localStorage.setItem('role', user.role );
    localStorage.setItem('name', user.name );
    localStorage.setItem('last_name', user.last_name );
    localStorage.setItem('token', user.token );
    localStorage.setItem('id', user.id );
    localStorage.setItem('photo', user.photo);
    localStorage.setItem('normalizedToLink', user.normalizedToLink);
    localStorage.setItem('hierarchy', user.hierarchy);
  }

  public deleteData(): void {
    localStorage.removeItem('area');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    localStorage.removeItem('last_name');
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('photo');
    localStorage.removeItem('normalizedToLink');
    localStorage.removeItem('hierarchy');
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public getIndex( index: string ): string {
    return localStorage.getItem( index );
  }

}
