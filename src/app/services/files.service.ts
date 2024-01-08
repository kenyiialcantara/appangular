import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { map, tap } from 'rxjs';

interface File {
  originalname: string;
  filename: string;
  location: string;
}

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  constructor(private httpClient: HttpClient) {}

  urlFile = 'https://api.escuelajs.co/api/v1/files/upload';

  getFile(name: string, url: string, type: string) {
    return this.httpClient.get(url, { responseType: 'blob' }).pipe(
      tap((content) => {
        const blob = new Blob([content], { type });
        saveAs(blob, name);
      }),
      map(() => true)
    );
  }

  uploadFile(file: Blob) {
    const dto = new FormData();
    dto.append('file', file);
    return this.httpClient.post<File>(this.urlFile, dto, {
      // headers: {
      //   'Content-type': 'multipart/form-data',
      // },
    });
  }
}
