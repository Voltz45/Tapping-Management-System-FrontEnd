import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient, HttpErrorResponse, HttpEvent} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserModel} from "../../model/user-model/user.model";
import {CustomHttpResponseModel} from "../../model/customHttpResponse-model/custom-http-response.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private host = environment.core236;

  constructor(private http: HttpClient) {
  }

  public getUsers(): Observable<UserModel[] | HttpErrorResponse> {
    return this.http.get<UserModel[]>(`${this.host}/user/list`);
  }

  public addUser(formData: FormData): Observable<UserModel | HttpErrorResponse> {
    return this.http.post<UserModel>(`${this.host}/user/add`, formData);
  }

  public updateUser(formData: FormData): Observable<UserModel | HttpErrorResponse> {
    return this.http.post<UserModel>(`${this.host}/user/update`, formData);
  }

  public resetPassword(email: string): Observable<CustomHttpResponseModel | HttpErrorResponse> {
    return this.http.get<CustomHttpResponseModel>(`${this.host}/user/resetpassword/${email}`);
  }

  public updateProfileImage(formData: FormData): Observable<HttpEvent<UserModel> | HttpErrorResponse> {
    return this.http.post<UserModel>(`${this.host}/user/updateProfileImage`, formData,
      {
        reportProgress: true,
        observe: 'events'
      });
  }

  public deleteUser(userId: number): Observable<CustomHttpResponseModel | HttpErrorResponse> {
    return this.http.delete<CustomHttpResponseModel>(`${this.host}/user/delete/${userId}`);
  }

  public addUsersToLocalCache(users: UserModel[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  public getUsersFromLocalCache(): UserModel[] | null {
    if (localStorage.getItem('users')) {
      return JSON.parse(localStorage.getItem('users') || '');
    }
    return null;
  }

  public createUserFormData(loggedInUsername: string, user: UserModel, profileImage: File): FormData {
    const formData = new FormData();
    formData.append('currentUsername', loggedInUsername);
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('role', user.role);
    formData.append('profileImage', profileImage);
    formData.append('isActive', JSON.stringify(user.active));
    formData.append('isNonLocked', JSON.stringify(user.notLocked));
    return formData;
  }
}
