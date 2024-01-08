import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateUserDTO, User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiUrl = 'https://api.escuelajs.co/api/v1/users';

  constructor(private httpClient: HttpClient) {}

  create(dto: CreateUserDTO) {
    const newDto = {
      ...dto,
      avatar: 'https://picsum.photos/800',
    };

    return this.httpClient.post<User>(this.apiUrl, newDto);
  }

  getAll() {
    return this.httpClient.get<User[]>(this.apiUrl);
  }
}
