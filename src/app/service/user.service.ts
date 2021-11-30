import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpEvent} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";
import {publish} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class UserService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  public getUsers(): Observable<User[] | HttpErrorResponse> {
    return this.http.get<User[]>(`${this.host}/user/list`);
  }

  public addUser(formData: FormData): Observable<User | HttpErrorResponse> {
    return this.http.post<User>(`${this.host}/user/add`, formData);
  }

  public updateUser(formData: FormData): Observable<User | HttpErrorResponse> {
    return this.http.post<User>(`${this.host}/user/update`, formData);
  }

  public resetPassword(email: string): Observable<any | HttpErrorResponse> {
    return this.http.get(`${this.host}/user/resetpassword/${email}`);
  }

  public updateProfileImage(formData: FormData): Observable<HttpEvent<User> | HttpErrorResponse> {
    return this.http.post<User>(`${this.host}/user/updateProfileImage`, formData,
      {
        reportProgress: true,
        observe: 'events'
      });
  }

  public deleteUser(userId: number): Observable<any | HttpErrorResponse> {
    return this.http.delete<any>(`${this.host}/user/delete/${userId}`);
  }

  public addUsersToLocalCache(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  public getUsersFromLocalCache(): User[] | null {
    if (localStorage.getItem('users')){
        return JSON.parse(localStorage.getItem('users') || '');
    }
    return null;
  }
}
